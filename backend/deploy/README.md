# Running the backend as a systemd service

`.env` loading is unaffected by any of this — `app.py` loads it itself via
`python-dotenv`, relative to its own file location, regardless of how the
process is started or what the working directory is.

## One-time setup

1. Fill in the two placeholders in `egreig-vistnes-backend.service`:
   - `<PI_USER>` — the Linux user to run the service as (e.g. `pi`).
   - `<REPO_PATH>` — the absolute path to this repo on the Pi
     (e.g. `/home/pi/egreig-vistnes.no`). It appears four times.

2. If you haven't already, create a venv at the repo root and install
   dependencies into it (Raspberry Pi OS blocks plain `pip install` against
   the system Python — this sidesteps that):

   ```
   cd <REPO_PATH>
   python3 -m venv .venv
   .venv/bin/pip install -r requirements.txt
   ```

   Already installing some other way (system-wide with
   `--break-system-packages`, pyenv, etc.)? Swap the `ExecStart` line's
   gunicorn path for whatever `which gunicorn` gives you there instead.

3. Install and start the unit:

   ```
   sudo cp backend/deploy/egreig-vistnes-backend.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now egreig-vistnes-backend
   ```

4. Check it's actually up:

   ```
   sudo systemctl status egreig-vistnes-backend
   curl http://localhost:5001/api/health
   ```

## Logs

```
journalctl -u egreig-vistnes-backend -f
```

## After a `git pull` (not a fresh clone)

Code and module changes aren't picked up automatically — restart the service:

```
sudo systemctl restart egreig-vistnes-backend
```

## The hardening lines

`ProtectSystem=strict` makes the whole filesystem read-only to the service
except what's listed in `ReadWritePaths` — shouldn't be needed since this
app doesn't write to disk, but included so a future change that does write
somewhere fails loudly instead of silently landing in the wrong place. If
the service fails to start and `journalctl` points at a permissions error
you don't understand, comment out the four hardening lines under `# Hardening`
first to confirm that's the cause before troubleshooting further.
