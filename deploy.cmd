cd dist
zip -r ./* dist.zip
ssh root@173.82.243.121 rm -rf /www/wwwroot/www.sepeach.com/dist/*
scp dist.zip root@173.82.243.121:/www/wwwroot/www.sepeach.com/dist/
ssh root@173.82.243.121 cd /www/wwwroot/www.sepeach.com/dist/ && unzip dist.zip
