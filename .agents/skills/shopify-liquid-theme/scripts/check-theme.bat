@echo off
REM Runs Shopify Theme Check on the local theme directory
cd /d "%~dp0..\..\..\shopify-theme"
npx @shopify/cli theme check
