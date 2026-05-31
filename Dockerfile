FROM nginx:1.27-alpine
COPY dist/ /usr/share/nginx/html/
RUN chmod 644 /usr/share/nginx/html/og-image.svg /usr/share/nginx/html/favicon.svg
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
