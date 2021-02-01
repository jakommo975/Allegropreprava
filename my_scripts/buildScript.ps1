rm -r ../build

npm run build

rm -r "C:\Users\Jakub\source\repos\allegropreprava\nopCommerce_4.00_Source\Presentation\Nop.Web\wwwroot\js\banners\*"

cp -r "../build/*" "C:\Users\Jakub\source\repos\allegropreprava\nopCommerce_4.00_Source\Presentation\Nop.Web\wwwroot\js\banners\"

python ./main.py

$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")