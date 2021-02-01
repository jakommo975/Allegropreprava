from html.parser import HTMLParser
from bs4 import BeautifulSoup



with open("../build/index.html") as fp:
    sourceSoup = BeautifulSoup(fp, 'html.parser')



scripts = sourceSoup.find_all('script')

cssLinks = sourceSoup.find_all('link')

sourceScipts = []

for script in scripts:
    if str(script).find('chunk') != -1 or str(script).find('function') != -1:
        sourceScipts.append(script)


sourceLinks = []

for link in cssLinks:
    if str(link).find('chunk') != -1:
        sourceLinks.append(link)


with open('C:/Users/Jakub/source/repos/allegropreprava/nopCommerce_4.00_Source/Presentation/Nop.Web/Areas/Admin/Views/Banner/_CreateOrUpdate.Info.cshtml') as output:
    destSoup = BeautifulSoup(output, 'html.parser')

destScripts = destSoup.findAll('script')

for i in range(0,3):
    if i == 0:
        destScripts[i].clear()
        destScripts[i].string = sourceScipts[i].string
    else:
        print(f"New script: {sourceScipts[i]['src']} | Old script {destScripts[i]['src']}")
        destScripts[i]['src'] = sourceScipts[i]['src']
        

print()

destLinks = destSoup.find_all('link')

for i in range (0,2):
    print(f"New link: {sourceLinks[i]['href']} | Old link {destLinks[i]['href']}")
    destLinks[i]['href'] = sourceLinks[i]['href']
    

print()

with open('xmlFile.html', 'w') as outputFIle:
    outputFIle.write(str(destSoup))

print("Success!")