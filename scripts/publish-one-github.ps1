param(
  [Parameter(Mandatory = $true)][string]$RepoName,
  [Parameter(Mandatory = $true)][string]$Slug,
  [Parameter(Mandatory = $true)][string]$FwLabel,
  [Parameter(Mandatory = $true)][string]$Tag
)

$ErrorActionPreference = "Continue"
$PublicDir = "C:\Users\bankr\OneDrive\Desktop\BMTB-Scripts\public"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProductData = Get-Content (Join-Path $ScriptDir "github-product-data.json") -Raw | ConvertFrom-Json
$TemplateDir = "C:\Users\bankr\OneDrive\Desktop\BMTB-Scripts\templates\script-repo"
$GitUser = "bankrollmadethisbeat"
$License = Get-Content "$TemplateDir\LICENSE" -Raw

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
  $notice = if ($premium) {
    "`n> Source files are **not** included in this repository.  `n> Purchase to download the full **$fwLabel** build.`n"
  } else {
    "`n> Download the full **$fwLabel** resource from Tebex or Gumroad below.`n"
  }
  $img = "<p align=`"center`">`n  <img src=`"https://raw.githubusercontent.com/$GitUser/$repoName/main/promo.png`" alt=`"$($product.name)`" width=`"640`" />`n</p>`n`n"
  $features = ""
  if ($product.features -and @($product.features).Count -gt 0) {
    $features = "`n## Features`n`n$(($product.features | ForEach-Object { '- ' + $_ }) -join "`n")`n"
  }
  $requirements = ""
  if ($product.requirements -and @($product.requirements).Count -gt 0) {
    $requirements = "`n## Requirements`n`n$(($product.requirements | ForEach-Object { '- ' + $_ }) -join "`n")`n"
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

if ($ProductData.PSObject.Properties.Name -notcontains $Slug) {
  Write-Error "Missing product data for slug: $Slug"
  exit 1
}

$product = $ProductData.$Slug
$dir = "$env:TEMP\bmtb-publish\$RepoName"
if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
New-Item -ItemType Directory -Path $dir -Force | Out-Null

Set-Content "$dir\LICENSE" $License -Encoding UTF8
$thumbPath = Get-ThumbPath $product.thumb
if ($thumbPath) { Copy-Item $thumbPath "$dir\promo.png" -Force }
Write-StoreReadme "$dir\README.md" $product $FwLabel $RepoName $Slug

Write-Output $dir
