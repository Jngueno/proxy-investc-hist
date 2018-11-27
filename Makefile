all: install run

## Depending on the docker install, check if sudo is needed
sudoneeded := $(shell docker version >/dev/null 2>&1; echo $$?)
ifeq ($(sudoneeded), 1)
        DOCKERCMD := sudo docker
        DOCKERCOMPOSECMD := sudo docker-compose
else
        DOCKERCMD := docker
        DOCKERCOMPOSECMD := docker-compose
endif

install:
	$(DOCKERCOMPOSECMD) up -d dev-proxy-image
	$(DOCKERCMD) exec -ti dev-proxy-investc /bin/sh -c "cp -u dev.env .env"
	$(DOCKERCMD) exec -ti dev-proxy-investc /bin/sh -c "npm install"

debug: restart all logs

run: docker_up
	$(DOCKERCMD) exec -ti ws-proxy-investc /bin/sh -c "npm start"

watch: docker_up
	$(DOCKERCMD) exec -ti ws-proxy-investc /bin/sh -c "npm run watch"

stop: docker_down

restart: stop run

logs:
	$(DOCKERCOMPOSECMD) logs -ft

bash:
	$(DOCKERCOMPOSECMD) up -d dev-proxy-image
	$(DOCKERCMD) exec -ti dev-proxy-investc /bin/sh

test:
	$(DOCKERCOMPOSECMD) up -d ws-proxy-image test-proxy-image
	$(DOCKERCMD) exec -ti test-proxy-investc /bin/sh

env:
	@cp -n dev.env .env
	@echo 'Please fill Gigya environment variables in .env file'

docker_up:
	$(DOCKERCOMPOSECMD) up -d

docker_down:
	$(DOCKERCOMPOSECMD) down

lint:
	$(DOCKERCMD) exec -ti dev-proxy-investc /bin/sh -c "npm run lint-local"

fix-lint:
	$(DOCKERCMD) exec -ti dev-proxy-investc /bin/sh -c "npm run lint-fix"
