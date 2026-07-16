# Publish all BMTB scripts to GitHub as STORE PAGES ONLY (README + LICENSE + promo - NO source)
$ErrorActionPreference = "Continue"
$UploadsRoot = "C:\Users\bankr\OneDrive\Desktop\uploadedscripts"
$PublicDir = "C:\Users\bankr\OneDrive\Desktop\BMTB-Scripts\public"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProductData = Get-Content (Join-Path $ScriptDir "github-product-data.json") -Raw | ConvertFrom-Json
$TemplateDir = "C:\Users\bankr\OneDrive\Desktop\BMTB-Scripts\templates\script-repo"
$Registry = "$UploadsRoot\github-repos.txt"
$GitUser = "bankrollmadethisbeat"
$License = Get-Content "$TemplateDir\LICENSE" -Raw
$token = ("protocol=https`nhost=github.com`n" | git credential fill | Select-String '^password=').ToString().Substring(9)
$ghHeaders = @{ Authorization = "token $token"; Accept = "application/vnd.github+json" }

# folder -> slug (repo base name before -esx/-qbcore suffix)
$folderSlug = @{
  bmtb_pillpress = "bmtb-pillpress"
  bmtb_pods = "bmtb-pods-2"
  bmtb_gofetch = "bmtb-gofetch"
  bmtb_trapphone = "bmtb-trapphone"
  bmtb_strippers = "bmtb-strippers"
  bmtb_lean = "bmtb-lean"
  bmtb_weaponrepair = "bmtb-weapon-repair"
  bmtb_wigs = "bmtb-wigs"
  bmtb_cooking = "bmtb-cooking"
  bmtb_moneywash = "bmtb-moneywash"
  bmtb_carwipe = "bmtb-car-wipe"
  bmtb_givecar = "bmtb-givecar"
  bmtb_itemslist = "bmtb-itemslist"
  bmtb_nocrosshair = "bmtb-nocrosshair"
  "[bmtbchopshop]" = "bmtb-chopshop"
  bmtb_chains = "bmtb-chains-as-items"
}

$storeOnlySlugs = @(
  @{ slug = "bmtb-tuning"; fws = @("esx", "qbcore") }
  @{ slug = "bmtb-recycle-job"; fws = @("esx", "qbcore") }
  @{ slug = "watermark-server-logo-script"; fws = @("esx") }
  @{ slug = "bmtb-loading-screen"; fws = @("esx") }
)

function Get-RepoExists($name) {
  $code = curl.exe -s -o NUL -w "%{http_code}" "https://api.github.com/repos/$GitUser/$name"
  return $code -eq "200"
}

function Ensure-GitHubRepo($name, $desc) {
  if (Get-RepoExists $name) { return }
  $body = @{ name = $name; description = $desc; private = $false } | ConvertTo-Json
  try {
    Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $ghHeaders -Body $body -ContentType "application/json" | Out-Null
  } catch {
    # Repo may already exist (rate limit on GET can miss it)
  }
}

function Get-ThumbPath($thumb) {
  if ($thumb -like "http*") {
    $tmp = Join-Path $env:TEMP "bmtb-thumb-$(Get-Random).png"
    Invoke-WebRequest -Uri $thumb -OutFile $tmp -UseBasicParsing
    return $tmp
  }
  $local = Join-Path $PublicDir ($thumb -replace '^/', '')
  if (Test-Path $local) { return $local }
  return $null
}

function Get-Product($slug) {
  if ($ProductData.PSObject.Properties.Name -notcontains $slug) {
    throw "Missing product data for slug: $slug"
  }
  return $ProductData.$slug
}

function Write-StoreReadme($path, $product, $fwLabel, $repoName, $slug) {
  $premium = $product.tag -eq "PREMIUM"
  $tagLine = if ($premium) { "**PREMIUM**" } else { "**FREE**" }
  $gumroad = if ($product.gumroad) { $product.gumroad } else { "https://bankrollmadethisbeat.gumroad.com/" }
  $version = if ($product.version) { "**Version:** $($product.version)  |  " } else { "" }
  $fwList = if ($product.frameworks) { ($product.frameworks -join ", ") } else { $fwLabel }
  $downloadHeading = if ($premium) { "Purchase" } else { "Download" }
  $footer = if ($premium) {
    "After purchase, download from Tebex or Gumroad. Pick the **$fwLabel** build in your package."
  } else {
    "Get the **$fwLabel** build from Tebex or Gumroad. Install guide is included with your download."
  }

  $img = @"
<p align="center">
  <img src="https://raw.githubusercontent.com/$GitUser/$repoName/main/promo.png" alt="$($product.name)" width="640" />
</p>

"@

  $notice = if ($premium) {
    "`n> Source files are **not** included in this repository.  `n> Purchase to download the full **$fwLabel** build.`n"
  } else {
    "`n> Download the full **$fwLabel** resource from Tebex or Gumroad below.`n"
  }

  $features = ""
  if ($product.features -and @($product.features).Count -gt 0) {
    $bullets = ($product.features | ForEach-Object { "- $_" }) -join "`n"
    $features = "`n## Features`n`n$bullets`n"
  }

  $requirements = ""
  if ($product.requirements -and @($product.requirements).Count -gt 0) {
    $bullets = ($product.requirements | ForEach-Object { "- $_" }) -join "`n"
    $requirements = "`n## Requirements`n`n$bullets`n"
  }

  $body = @"
# $($product.name) ($fwLabel)

$img$tagLine FiveM script by **BMTB Scripts**.
$notice
$version**Framework build:** $fwLabel  
**Supported frameworks:** $fwList

## About

$($product.desc)

$($product.fullDesc)
$features$requirements
## $downloadHeading

| Store | Link |
|-------|------|
| **Tebex** | $($product.tebex) |
| **Gumroad** | $gumroad |

## Store page

https://bmtbscripts.online/scripts/$slug

## Support

- **Discord:** https://discord.gg/5rRMZ2R9EP
- **Website:** https://bmtbscripts.online

---

*$footer*
"@

  Set-Content -Path $path -Value $body -Encoding UTF8
}

function Publish-StorePage($repoName, $slug, $fwLabel, $tag) {
  $product = Get-Product $slug

  $dir = "$env:TEMP\bmtb-publish\$repoName"
  if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }

  $cloned = $false
  if (Get-RepoExists $repoName) {
    & git clone --depth 1 "https://github.com/$GitUser/$repoName.git" $dir 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0 -and (Test-Path "$dir\.git")) {
      $cloned = $true
      Get-ChildItem $dir -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
    } elseif (Test-Path $dir) {
      Remove-Item $dir -Recurse -Force
    }
  }
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  Set-Content "$dir\LICENSE" $License -Encoding UTF8
  $thumbPath = Get-ThumbPath $product.thumb
  if ($thumbPath) { Copy-Item $thumbPath "$dir\promo.png" -Force }
  Write-StoreReadme "$dir\README.md" $product $fwLabel $repoName $slug

  $env:GIT_DIR = ""
  Push-Location $dir
  if (-not $cloned) {
    if (-not (Test-Path ".git")) { git init | Out-Null; git branch -M main }
  }
  git remote remove origin 2>$null | Out-Null
  Ensure-GitHubRepo $repoName "BMTB $($product.name) - $fwLabel ($tag) store page"
  git remote add origin "https://github.com/$GitUser/$repoName.git" 2>$null | Out-Null
  git add -A
  git diff --cached --quiet
  if ($LASTEXITCODE -ne 0) {
    git commit -m "Store page only - links, features, requirements ($fwLabel)" | Out-Null
    & git push -u origin main --force 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) { & git push -u origin main --force 2>$null | Out-Null }
  }
  Pop-Location
}

$results = @()
$registryLines = @()

foreach ($fwKey in @("esx", "qbcore")) {
  $fwPath = Join-Path $UploadsRoot $fwKey
  if (-not (Test-Path $fwPath)) { continue }
  $fwLabel = if ($fwKey -eq "esx") { "ESX Legacy" } else { "QBCore" }

  foreach ($folder in Get-ChildItem $fwPath -Directory | Select-Object -ExpandProperty Name) {
    if ($folder -eq "police_donuts") { continue }
    if (-not $folderSlug.ContainsKey($folder)) { continue }

    $slug = $folderSlug[$folder]
    $product = Get-Product $slug
    $repoName = "$slug-$fwKey"
    if ($folder -eq "bmtb_pods" -and $fwKey -eq "esx") { $repoName = "bmtb-pods-2" }
    if ($folder -eq "bmtb_chains") { $repoName = "bmtb-chains-$fwKey" }

    try {
      Publish-StorePage $repoName $slug $fwLabel $product.tag
      $results += "STORE PAGE  $repoName ($($product.tag))"
      $registryLines += "$fwKey|$folder|$repoName|$($product.tag)"
    } catch {
      $results += "FAILED      $repoName - $_"
    }
  }
}

foreach ($item in $storeOnlySlugs) {
  $product = Get-Product $item.slug
  foreach ($fw in $item.fws) {
    $fwLabel = if ($fw -eq "esx") { "ESX Legacy" } else { "QBCore" }
    $repoName = if ($item.fws.Count -gt 1) { "$($item.slug)-$fw" } else { $item.slug }
    try {
      Publish-StorePage $repoName $item.slug $fwLabel $product.tag
      $results += "STORE PAGE  $repoName (no upload)"
      $registryLines += "$fw|store|$repoName|$($product.tag)"
    } catch {
      $results += "FAILED      $repoName - $_"
    }
  }
}

$header = @"
# BMTB script registry - auto-generated
# format: framework|folder|repo-name|tag
# GitHub = store pages only (README + LICENSE + promo). NO source files.
"@
Set-Content $Registry ($header + "`n" + ($registryLines -join "`n")) -Encoding UTF8
$results | ForEach-Object { Write-Output $_ }
