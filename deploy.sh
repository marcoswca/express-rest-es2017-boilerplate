#!/bin/bash
docker build -t marcoswca/express-rest-es2017-boilerplate .
docker push marcoswca/express-rest-es2017-boilerplate

ssh deploy@$DEPLOY_SERVER << EOF
docker pull marcoswca/express-rest-es2017-boilerplate
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi marcoswca/express-rest-es2017-boilerplate:current || true
docker tag marcoswca/express-rest-es2017-boilerplate:latest marcoswca/express-rest-es2017-boilerplate:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 marcoswca/express-rest-es2017-boilerplate:current
EOF
