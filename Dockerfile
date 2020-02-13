# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Copy any webpack built files to the app directory
COPY dist /usr/src/app

# Change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json ./
COPY yarn.lock ./

# Install production dependencies.
RUN yarn install --only=production

# Copy local code to the container image.
COPY . ./

ENV NODE_ENV="production"
ENV BASE_BACKEND_URL='https://global-apps-backend-uevpdyoiea-ew.a.run.app'
ENV BASE_BACKEND_URL_DEV='https://global-apps-dev-backend-uevpdyoiea-ew.a.run.app';

# Run the web service on container startup.
CMD [ "yarn", "start" ]
