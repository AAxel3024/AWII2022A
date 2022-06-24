FROM node
COPY . /var/www
WORKDIR /var/www
RUN npm install
RUN npm install -g typescript
RUN tsc
ENV PORT=2500
ENV MONGODB_CNN=mongodb://mongo:27017/TarjetasBuses
EXPOSE 2500
ENTRYPOINT ["npm","start"]
