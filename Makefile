.PHONY: help check dev deploy modules rollback

.DEFAULT_GOAL := help

help:
	@printf '%s\n' \
	  'Commandes disponibles :' \
	  '  make help      Afficher cette aide' \
	  '  make check     Valider la configuration Docker Compose' \
	  '  make modules   Synchroniser les modules locaux' \
	  '  make dev       Synchroniser les modules et lancer Docker en local' \
	  '  make deploy    Déployer sur mirror.local' \
	  '  make rollback  Revenir à la release précédente sur mirror.local'

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
