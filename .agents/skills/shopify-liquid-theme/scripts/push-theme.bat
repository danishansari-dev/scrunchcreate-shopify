@echo off
REM Deploys the local theme directly to the live Shopify store
cd /d "%~dp0..\..\..\shopify-theme"
npx @shopify/cli theme push --store scrunchcreate.myshopify.com --allow-live --live
