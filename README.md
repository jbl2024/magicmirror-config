# MagicMirror configuration and recovery

This repository is the source of truth for the mirror configuration. It does
not contain runtime secrets, generated `config.js` files, module checkouts, or
machine backups.

## Layout

- `data/config/config.js.template`: shared MagicMirror configuration.
- `data/config/custom.css`: shared visual theme.
- `modules.lock`: exact repository and commit for every third-party module.
- `compose.yaml`: local server-only development environment.
- `scripts/install-local`: transactional installation on `mirror.local`.
- `scripts/rollback`: switch back to the previously active release.
- `ansible/bootstrap.yml`: rebuild a fresh Debian 12 ARM64 host.

## Secrets

Copy `.env.example` to `.env` for local Docker development.

Production secrets live only on the mirror:

```text
/home/jerome/.config/magicmirror/config.env
```

The file must define every variable from `.env.example` and use mode `0600`.
Store a second encrypted copy in a password manager. Never add the file to Git.

An encrypted backup can also be created with an age public key:

```bash
AGE_RECIPIENT=age1... ./scripts/backup
```

The former local history and dated tar archives contain credentials. Rotate the
Linky token and private calendar URLs. The clean `main` branch has no parent
commit and contains neither secrets, coordinates, nor station identifiers.

## Local development

```bash
cp .env.example .env
./scripts/sync-modules
make check
make dev
```

The Docker image is pinned in `compose.yaml`; module commits are pinned in
`modules.lock`.

## First installation or disaster recovery

The playbook pins Node 24.18.1 from the official ARM64 release and checks its
SHA-256 checksum.

```bash
ansible-playbook -i ansible/inventory.ini ansible/bootstrap.yml --ask-become-pass
scp config.env jerome@mirror.local:.config/magicmirror/config.env
ssh jerome@mirror.local 'chmod 600 .config/magicmirror/config.env'
ssh jerome@mirror.local 'cd magicmirror-config && ./scripts/install-local'
```

The first deployment does not overwrite the historical `~/MagicMirror`
directory. New releases are installed below:

```text
~/.local/share/magicmirror/releases/
```

PM2 starts the atomic `~/.local/share/magicmirror/current` symlink.

On the existing host, migrate the former `config.env` once without displaying
its values:

```bash
./scripts/migrate-legacy-env
```

## Routine operations

Deploy the committed configuration:

```bash
make deploy
```

Test another MagicMirror release without changing `VERSION`:

```bash
./scripts/upgrade 2.37.0
```

Roll back to the previous successfully validated release:

```bash
make rollback
```

For a permanent upgrade, update `VERSION`, validate locally, commit it, and run
`make deploy`.
