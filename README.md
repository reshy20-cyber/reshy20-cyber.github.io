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
| `supabase/functions/` | Edge Functions: `verify-purchase`, `delete-account` |

The signing keystore in `android/` is password-protected; the password lives only in the repository secret `HAYATI_KEY_PASSWORD`.
