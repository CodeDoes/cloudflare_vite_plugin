{ pkgs ? import <nixpkgs> {} }:
let
  # nodeDependencies = (pkgs.callPackage ./default.nix {}).nodeDependencies
in
  with pkgs; 
  mkShell {
    packages = [
      nodejs_20
      nodePackages.node2nix
      nodePackages_latest.pnpm
    ];
    buildInputs = [
      # nodejs
      # pnpmPackages
      # playwright-test
      # playwright-driver
      # playwright-driver.browsers
    ];
    
    PLAYWRIGHT_BROWSERS_PATH="${playwright-driver.browsers}";
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1;
    # PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true;
    
}