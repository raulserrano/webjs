# Usamos Nginx sobre Alpine Linux por ser extremadamente ligero y de alto rendimiento
FROM nginx:alpine

# Reemplazamos la configuración por defecto de Nginx con nuestra configuración optimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos de la aplicación web al directorio público de Nginx
COPY . /usr/share/nginx/html

# Limpiamos archivos de configuración del directorio web por seguridad
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.dockerignore

# Exponemos el puerto 80 (puerto interno estándar para Dokploy)
EXPOSE 80

# Ejecución de Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
