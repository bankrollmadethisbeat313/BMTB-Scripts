# Add promo.png + README image to BMTB GitHub repos that are missing one
$ErrorActionPreference = "Stop"
$UploadsRoot = "C:\Users\bankr\OneDrive\Desktop\uploadedscripts"
$PublicDir = "C:\Users\bankr\OneDrive\Desktop\BMTB-Scripts\public"
$Registry = "$UploadsRoot\github-repos.txt"
$GitUser = "bankrollmadethisbeat"
$WorkRoot = "$env:TEMP\bmtb-promo-update"

$catalog = @{
  bmtb_pillpress = @{ name = "BMTB Pill Press"; thumb = "/bmtb-pillpress-thumb.png" }
  bmtb_pods = @{ name = "BMTB Pods 2.0"; thumb = "/bmtb-pods-2-thumb.png" }
  bmtb_gofetch = @{ name = "BMTB GoFetch"; thumb = "/bmtb-gofetch-thumb.png" }
  bmtb_trapphone = @{ name = "BMTB Trap Phone"; thumb = "/bmtb-trapphone-thumb.png" }
  bmtb_strippers = @{ name = "BMTB Strippers"; thumb = "/bmtb-strippers-thumb.png" }
  bmtb_lean = @{ name = "BMTB Lean"; thumb = "https://dunb17ur4ymx4.cloudfront.net/packages/images/89df115a0ecfdc8b20fcb81c3a69b58c9023bbc8.png" }
  bmtb_weaponrepair = @{ name = "BMTB Weapon Repair"; thumb = "/bmtb-weapon-repair-thumb.png" }
  bmtb_wigs = @{ name = "BMTB Wigs"; thumb = "https://dunb17ur4ymx4.cloudfront.net/packages/images/581b5174063646063e13bb2d9d6bdf1416188bda.png" }
  bmtb_cooking = @{ name = "BMTB Cooking"; thumb = "/bmtb-cooking-thumb.png" }
  bmtb_moneywash = @{ name = "BMTB Moneywash"; thumb = "/bmtb-moneywash-thumb.png" }
  bmtb_carwipe = @{ name = "BMTB Car Wipe"; thumb = "/bmtb-car-wipe-thumb.png" }
  bmtb_givecar = @{ name = "BMTB Givecar"; thumb = "/bmtb-givecar-thumb.png" }
  bmtb_itemslist = @{ name = "BMTB ITEMSLIST"; thumb = "/bmtb-itemslist-thumb.png" }
  bmtb_nocrosshair = @{ name = "BMTB NoCrosshair"; thumb = "/bmtb-nocrosshair-thumb.png" }
  "[bmtbchopshop]" = @{ name = "BMTB Chopshop"; thumb = "/bmtb-chopshop-thumb.png" }
  bmtb_chains = @{ name = "BMTB Chains As Items"; thumb = "/bmtb-chains-thumb.png" }
}

$storeOnly = @{
  "bmtb-tuning-esx" = @{ name = "BMTB Tuning"; thumb = "/bmtb-tuning-thumb.png" }
  "bmtb-tuning-qbcore" = @{ name = "BMTB Tuning"; thumb = "/bmtb-tuning-thumb.png" }
  "bmtb-recycle-job-esx" = @{ name = "BMTB Recycle Job"; thumb = "/bmtb-recycle-job-thumb.png" }
  "bmtb-recycle-job-qbcore" = @{ name = "BMTB Recycle Job"; thumb = "/bmtb-recycle-job-thumb.png" }
  "watermark-server-logo-script" = @{ name = "Watermark Server Logo Script"; thumb = "/bmtb-watermark-thumb.png" }
  "bmtb-loading-screen" = @{ name = "BMTB Loading Screen"; thumb = "/bmtb-loading-screen-thumb.png" }
}

function Get-ThumbFile($thumb) {
  if ($thumb -like "http*") {
    $tmp = Join-Path $env:TEMP "bmtb-thumb-$(Get-Random).png"
    Invoke-WebRequest -Uri $thumb -OutFile $tmp -UseBasicParsing
    return $tmp
  }
  $local = Join-Path $PublicDir ($thumb -replace '^/', '')
  if (-not (Test-Path $local)) { throw "Thumb not found: $local" }
  return $local
}

function Resolve-ScriptPath($fwKey, $folder) {
  $base = Join-Path (Join-Path $UploadsRoot $fwKey) $folder
  if (Test-Path -LiteralPath (Join-Path $base "fxmanifest.lua")) { return $base }
  foreach ($n in @("bmtb_chopshop", "bmtb_carwipe", "bmtb_weaponrepair")) {
    $p = Join-Path $base $n
    if (Test-Path -LiteralPath (Join-Path $p "fxmanifest.lua")) { return $p }
  }
  return $null
}

function Get-RepoMeta($fw, $folder, $repo) {
  if ($storeOnly.ContainsKey($repo)) { return $storeOnly[$repo] }
  if ($catalog.ContainsKey($folder)) { return $catalog[$folder] }
  throw "No metadata for $repo ($fw|$folder)"
}

function Test-ReadmeHasImage($text) {
  return $text -match 'raw\.githubusercontent\.com.*\.(png|jpg|jpeg|gif|webp)'
}

function Add-ImageToReadme($readmePath, $repoName, $altName) {
  $content = Get-Content -LiteralPath $readmePath -Raw
  if (Test-ReadmeHasImage $content) { return $false }
  $img = "<p align=`"center`">`n  <img src=`"https://raw.githubusercontent.com/$GitUser/$repoName/main/promo.png`" alt=`"$altName`" width=`"640`" />`n</p>`n`n"
  if ($content -match '(?m)^#\s+') {
    $content = [regex]::Replace($content, '(?ms)^(#\s+[^\r\n]+)\r?\n', "`$1`n`n$img", 1)
  } else {
    $content = $img + $content
  }
  Set-Content -LiteralPath $readmePath -Value $content -Encoding UTF8
  return $true
}

function Get-WorkDir($fw, $folder, $repo) {
  $scriptPath = Resolve-ScriptPath $fw $folder
  if ($scriptPath -and (Test-Path (Join-Path $scriptPath ".git"))) {
    $remote = (git -C $scriptPath remote get-url origin 2>$null)
    if ($remote -match [regex]::Escape($repo)) { return $scriptPath }
  }
  $dir = Join-Path $WorkRoot $repo
  if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  git clone --depth 1 "https://github.com/$GitUser/$repo.git" $dir *> $null
  if ($LASTEXITCODE -ne 0) { throw "Clone failed for $repo" }
  return $dir
}

$lines = Get-Content $Registry | Where-Object { $_ -and $_ -notmatch '^#' }
$results = @()

foreach ($line in $lines) {
  $parts = $line -split '\|'
  if ($parts.Count -lt 4) { continue }
  $fw, $folder, $repo, $tag = $parts[0], $parts[1], $parts[2], $parts[3]

  try {
    $readmeUrl = "https://raw.githubusercontent.com/$GitUser/$repo/main/README.md"
    $remoteReadme = (curl.exe -s $readmeUrl)
    if ($remoteReadme -match 'raw\.githubusercontent\.com') {
      $results += "SKIP (has image) $repo"
      continue
    }

    $meta = Get-RepoMeta $fw $folder $repo
    $workDir = Get-WorkDir $fw $folder $repo
    $thumbFile = Get-ThumbFile $meta.thumb
    Copy-Item $thumbFile (Join-Path $workDir "promo.png") -Force

    $readmePath = Join-Path $workDir "README.md"
    if (-not (Test-Path $readmePath)) { throw "No README.md in $repo" }
    Add-ImageToReadme $readmePath $repo $meta.name | Out-Null

    $env:GIT_DIR = ""
    Push-Location $workDir
    git add promo.png README.md
    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
      $results += "SKIP (no changes) $repo"
      Pop-Location
      continue
    }
    git commit -m "Add promo image to README" | Out-Null
    git push origin main *> $null
    if ($LASTEXITCODE -ne 0) { throw "Push failed" }
    Pop-Location
    $results += "UPDATED $repo"
  } catch {
    if ((Get-Location).Path -ne $PWD.Path) { Pop-Location -ErrorAction SilentlyContinue }
    $results += "FAILED $repo - $_"
  }
}

$results | ForEach-Object { Write-Output $_ }
