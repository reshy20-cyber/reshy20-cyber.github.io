# HAYATI · حياتي

Personal life organizer — tasks, money, shopping, notes and goals. Web app + Android (Trusted Web Activity with Google Play Billing).

- App: https://reshy20-cyber.github.io/hayati/
- Privacy policy: https://reshy20-cyber.github.io/hayati/privacy.html
- Account deletion: https://reshy20-cyber.github.io/hayati/delete-account.html

| Folder | What |
|---|---|
| `hayati/` | The web app (served by GitHub Pages) |
| `.well-known/assetlinks.json` | Digital Asset Links for the Android app |
| `android/` | Android project (`app.hayati.organizer`), built by `.github/workflows/android.yml` |
| `android-tafawoq/` | Tafawoq Android app (`app.tafawoq`), built by `.github/workflows/android-tafawoq.yml` |
| `tafawoq-prep/` | Tafawoq Prep (تفوق إعدادي) web app, built from the Tafawoq engine by `tools/tafawoq-prep/build.py`; content (units, unit summaries, question banks from the 2026–2027 term-1 ministry books) lives in `tools/tafawoq-prep/content/*.json` |
| `android-tafawoq-prep/` | Tafawoq Prep Android app (`app.tafawoq.prep`), built by `.github/workflows/android-tafawoq-prep.yml` (secret `TAFAWOQPREP_KEY_PASSWORD`) |
| `android-border/` | Border Companion Android app (`app.bordercompanion`), built by `.github/workflows/android-border.yml` |
| `supabase/functions/` | Edge Functions: `verify-purchase`, `delete-account` |

The signing keystore in `android/` is password-protected; the password lives only in the repository secret `HAYATI_KEY_PASSWORD`.

The Tafawoq and Border Companion keystores are protected the same way, with the secrets `TAFAWOQ_KEY_PASSWORD` and `BORDER_KEY_PASSWORD`.
