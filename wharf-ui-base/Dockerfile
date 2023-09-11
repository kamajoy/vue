FROM nginx:stable

COPY dist /usr/share/nginx/html

RUN line=`grep -n 'location / {' /etc/nginx/conf.d/default.conf | awk -F ':' '{print $1}'` \
    && sed -i $line'a try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
