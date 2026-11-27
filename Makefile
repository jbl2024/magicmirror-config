.PHONY: check dev deploy modules rollback

check:
	docker compose config --quiet

dev: modules
	docker compose up -d

modules:
	./scripts/sync-modules

deploy:
	./scripts/deploy

rollback:
	ssh "$${MIRROR_TARGET:-jerome@mirror.local}" \
	  'cd "$$HOME/magicmirror-config" && ./scripts/rollback'
