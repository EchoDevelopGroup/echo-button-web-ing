cd dist
zip dist.zip -r ./*
scp dist.zip root@173.82.243.121:/www/wwwroot/www.sepeach.com/
ssh root@173.82.243.121 bash /www/wwwroot/www.sepeach.com/deploy.sh
