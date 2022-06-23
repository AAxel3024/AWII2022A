FROM node
COPY . /var/www
WORKDIR /var/www
RUN npm install
RUN npm install -g typescript
RUN tsc
EXPOSE 2500
ENTRYPOINT ["npm","start"]
