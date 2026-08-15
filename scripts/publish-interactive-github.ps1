# Interactive GitHub store-page publisher (README + LICENSE + promo - no source files)
param(
  [string]$Slug,
  [string]$RepoName,
  [switch]$Yes
)

$ErrorActionPreference = "Stop"
$RequestedSlug = $Slug
$RequestedRepoName = $RepoName

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProductJson = Join-Path $ScriptDir "github-product-data.json"
$Registry = Join-Path $ScriptDir "github-repos.txt"
$PublishOne = Join-Path $ScriptDir "publish-one-github.ps1"
$DefaultGitUser = "bankrollmadethisbeat"

function Get-GitHubLogin {
  if ($env:BMTB_GITHUB_USER) { return $env:BMTB_GITHUB_USER.Trim() }
  if (Get-Command gh -ErrorAction SilentlyContinue) {
    $prev = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $login = gh api user -q .login 2>$null
    $ErrorActionPreference = $prev
    if ($login) { return $login.Trim() }
  }
  return $DefaultGitUser
}

$GitUser = Get-GitHubLogin

function Write-Banner {
  Write-Host ""
  Write-Host "  ============================================"
  Write-Host "   BMTB - Publish / Update Script on GitHub"
  Write-Host "   Optional per-script store README repos"
  Write-Host "   Website + products: use Update-BMTB-Website.bat"
  Write-Host "   GitHub account: $GitUser"
  Write-Host "  ============================================"
  Write-Host ""
}

function Test-GitHubRepoExists([string]$RepoName) {
  if (Get-Command gh -ErrorAction SilentlyContinue) {
    $prev = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    gh repo view "$GitUser/$RepoName" --json name 2>$null | Out-Null
    $exists = ($LASTEXITCODE -eq 0)
    $ErrorActionPreference = $prev
    if ($exists) { return $true }
  }

  $code = curl.exe -s -o NUL -w "%{http_code}" "https://api.github.com/repos/$GitUser/$RepoName"
  return $code -eq "200"
}

function Ensure-GitHubRepo([string]$Name, [string]$Description) {
  if (Test-GitHubRepoExists $Name) { return $true }

  if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "WARNING: gh CLI not found - install GitHub CLI or create repo manually."
    return $false
  }

  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  gh repo create "$GitUser/$Name" --public --description $Description 2>$null | Out-Null
  $created = ($LASTEXITCODE -eq 0)
  $ErrorActionPreference = $prev
  if ($created) { Start-Sleep -Seconds 1 }
  return (Test-GitHubRepoExists $Name)
}

function Get-GitHubToken {
  $raw = "protocol=https`nhost=github.com`n`n" | git credential fill 2>$null
  foreach ($line in @($raw -split "`n")) {
    if ($line.StartsWith("password=")) {
      return $line.Substring(9).Trim()
    }
  }
  return $null
}

function Invoke-GitPush {
  param([switch]$Force)
  $pushArgs = @("push", "-u", "origin", "main")
  if ($Force) { $pushArgs += "--force" }
  $code = Invoke-GitQuiet @pushArgs
  if ($code -eq 0) { return 0 }

  $token = Get-GitHubToken
  if (-not $token) { return $code }

  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & git -c "http.extraHeader=Authorization: Bearer $token" @pushArgs 2>$null | Out-Null
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $prev
  return $exitCode
}

function Invoke-GitQuiet {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & git @GitArgs 2>$null | Out-Null
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $prev
  return $exitCode
}

function Test-GitRemote([string]$Name) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $remotes = & git remote 2>$null
  $ErrorActionPreference = $prev
  return ($remotes -contains $Name)
}

function Ensure-GitRemote([string]$RemoteUrl) {
  if (Test-GitRemote "origin") {
    Invoke-GitQuiet remote set-url origin $RemoteUrl | Out-Null
  } else {
    $code = Invoke-GitQuiet remote add origin $RemoteUrl
    if ($code -ne 0) { throw "git remote add origin failed" }
  }
}

function Get-DefaultRepoName([string]$Slug) {
  if ($Slug -eq "bmtb-pods-2") { return "bmtb-pods-2" }
  return $Slug
}

function Get-RegistryRepo([string]$Slug) {
  if (-not (Test-Path $Registry)) { return $null }
  foreach ($line in Get-Content $Registry) {
    if ($line -match "^\s*#" -or [string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line -split "\|"
    if ($parts.Count -ge 3 -and $parts[0].Trim() -eq $Slug) {
      return $parts[1].Trim()
    }
    if ($parts.Count -ge 4 -and $parts[1].Trim() -eq $Slug) {
      return $parts[2].Trim()
    }
  }
  return $null
}

function Save-Registry([string]$Slug, [string]$RepoName, [string]$Tag) {
  $line = "$Slug|$RepoName|$Tag"
  $lines = @()
  if (Test-Path $Registry) {
    $lines = Get-Content $Registry
  } else {
    $lines = @(
      "# BMTB script registry",
      "# format: slug|repo-name|tag",
      "# (legacy lines framework|slug|repo-name|tag still work for lookup)"
    )
  }
  $found = $false
  $out = foreach ($existing in $lines) {
    if ($existing -match "^\s*#" -or [string]::IsNullOrWhiteSpace($existing)) {
      $existing
      continue
    }
    $parts = $existing -split "\|"
    $existingSlug = if ($parts.Count -ge 4) { $parts[1].Trim() } else { $parts[0].Trim() }
    if ($existingSlug -eq $Slug) {
      $found = $true
      $line
    } else {
      $existing
    }
  }
  if (-not $found) { $out += $line }
  Set-Content -Path $Registry -Value ($out -join "`n") -Encoding UTF8
}

Write-Banner

if (-not (Test-Path $ProductJson)) {
  Write-Host "ERROR: Missing $ProductJson"
  exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: git not found in PATH"
  exit 1
}

$products = Get-Content $ProductJson -Raw | ConvertFrom-Json

$entries = @()
$idx = 0
foreach ($prop in $products.PSObject.Properties | Sort-Object Name) {
  $slug = $prop.Name
  $product = $prop.Value
  $idx++
  $defaultRepo = Get-DefaultRepoName $slug
  $regRepo = Get-RegistryRepo $slug
  $repoGuess = if ($regRepo) { $regRepo } else { $defaultRepo }
  $status = if (Test-GitHubRepoExists $repoGuess) { "ON GITHUB" } else { "NEW" }
  $entries += [pscustomobject]@{
    Index = $idx
    Slug = $slug
    Name = $product.name
    Tag = $product.tag
    Status = $status
    DefaultRepo = $repoGuess
    Product = $product
  }
}

Write-Host "Scripts (all frameworks - one store page per repo):"
Write-Host ""
foreach ($entry in $entries) {
  Write-Host ("  {0}. {1}  [{2}] [{3}]" -f $entry.Index, $entry.Name, $entry.Tag, $entry.Status)
}

if ($RequestedSlug) {
  $selected = $entries | Where-Object { $_.Slug -eq $RequestedSlug } | Select-Object -First 1
  if (-not $selected) {
    Write-Host "ERROR: Unknown slug: $RequestedSlug"
    exit 1
  }
} else {
  Write-Host ""
  $pickRaw = Read-Host "Pick script number"
  if (-not ($pickRaw -match '^\d+$')) {
    Write-Host "ERROR: Invalid number."
    exit 1
  }
  $selected = $entries | Where-Object { $_.Index -eq [int]$pickRaw } | Select-Object -First 1
  if (-not $selected) {
    Write-Host "ERROR: Invalid number."
    exit 1
  }
}

$slug = $selected.Slug
$product = $selected.Product
$tag = $product.tag
$defaultRepo = $selected.DefaultRepo
if ($Yes) {
  $repoName = if ([string]::IsNullOrWhiteSpace($RequestedRepoName)) { $defaultRepo } else { $RequestedRepoName.Trim() }
} else {
  $repoInput = Read-Host "GitHub repo name [default: $defaultRepo]"
  $repoName = if ([string]::IsNullOrWhiteSpace($repoInput)) { $defaultRepo } else { $repoInput.Trim() }
}
$remote = "https://github.com/$GitUser/$repoName.git"
$repoUrl = "https://github.com/$GitUser/$repoName"
$mode = if (Test-GitHubRepoExists $repoName) { "UPDATE" } else { "NEW" }
$repoDesc = "BMTB $($product.name) - $tag store page"

Write-Host ""
Write-Host "Script: $($product.name)"
Write-Host "Slug:   $slug"
Write-Host "Type:   $tag"
Write-Host "Upload: Store page ONLY (README + LICENSE + promo)"
Write-Host "Mode:   $mode ($repoUrl)"
Write-Host ""

$staging = & $PublishOne -RepoName $repoName -Slug $slug -Tag $tag -GitUser $GitUser | Select-Object -Last 1
if (-not (Test-Path $staging)) {
  Write-Host "ERROR: Failed to build staging folder."
  exit 1
}

Push-Location $staging
try {
  if (-not (Test-Path ".git")) {
    git init | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "git init failed" }
    git branch -M main | Out-Null
  }

  Ensure-GitRemote $remote

  if ($mode -eq "UPDATE") {
    Write-Host "[1/4] Fetching from GitHub..."
    Invoke-GitQuiet fetch origin main | Out-Null
    if ((Invoke-GitQuiet rev-parse --verify origin/main) -eq 0) {
      if ((Invoke-GitQuiet rev-parse --verify main) -ne 0) {
        Invoke-GitQuiet checkout -B main origin/main | Out-Null
      }
      Write-Host "[2/4] Pulling remote changes..."
      if ((Invoke-GitQuiet pull --rebase origin main) -ne 0) {
        throw "Pull failed - fix conflicts, then run again."
      }
    }
  } else {
    Write-Host "[1/4] New repo - creating on GitHub if needed..."
    if (-not (Ensure-GitHubRepo $repoName $repoDesc)) {
      Write-Host ""
      Write-Host "Repo not found under $GitUser : $repoUrl"
      Write-Host "Create a PUBLIC repo: https://github.com/new?name=$repoName"
      Write-Host "Must be under account: $GitUser"
      if (-not $Yes) {
        Read-Host "Press Enter after creating the repo (or to retry push if it already exists)"
      }
      if (-not (Test-GitHubRepoExists $repoName)) {
        Write-Host "WARNING: Could not verify repo - attempting push anyway..."
      } else {
        Write-Host "GitHub repo ready: $repoUrl"
      }
    } else {
      Write-Host "GitHub repo ready: $repoUrl"
    }
  }

  Write-Host "[3/4] Staging..."
  git add -A
  git status -sb
  Write-Host ""

  if ((Invoke-GitQuiet diff --cached --quiet) -eq 0) {
    Write-Host "No changes to commit."
  } else {
    if ($mode -eq "UPDATE") {
      $defaultMsg = "Update $repoName"
    } else {
      $defaultMsg = "Release $repoName"
    }
    $msg = if ($Yes) { $defaultMsg } else {
      $inputMsg = Read-Host "Commit message [$defaultMsg]"
      if ([string]::IsNullOrWhiteSpace($inputMsg)) { $defaultMsg } else { $inputMsg }
    }
    git -c "user.name=$GitUser" -c "user.email=$GitUser@users.noreply.github.com" commit -m $msg
    if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
  }

  Write-Host "[4/4] Pushing..."
  $pushCode = Invoke-GitPush -Force
  if ($pushCode -ne 0) {
    $pushCode = Invoke-GitPush
  }
  if ($pushCode -ne 0) {
    throw @"
git push failed for $repoUrl

Common fixes:
- gh auth login (you are using: $GitUser)
- Create the repo at https://github.com/new?name=$repoName under $GitUser
- Or set BMTB_GITHUB_USER if you need a different account
"@
  }
} finally {
  Pop-Location
}

Save-Registry $slug $repoName $tag

Write-Host ""
Write-Host "  ============================================"
Write-Host "   SUCCESS - $mode ($tag)"
Write-Host "   Repo: $repoUrl"
Write-Host "   Store page only - links, features, requirements."
Write-Host "  ============================================"
