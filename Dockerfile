###
# builder image
FROM node:16-alpine as builder

# directory app will be built
WORKDIR /home/app

# copy dependency definitions
COPY package.json package-lock.json /home/app/

# install all dependencies
RUN npm install

# copy typescript build config
COPY tsconfig.json /home/app/

# copy app source
COPY src /home/app/src

# build app
RUN npm run tsc-build

###
# final image
FROM node:16-alpine

# directory app will be placed
WORKDIR /home/app

# copy built app from builder
COPY --from=builder /home/app/package.json /home/app/package-lock.json /home/app/dist ./

# Install production dependecies
RUN npm install --production

# Expose the port the app runs in
EXPOSE 4000

# Serve the app
ENTRYPOINT ["node", "index.js"]

# Enable passing extra arguments as CMD (ex. v8-options)
CMD []
