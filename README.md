# Florence Care 24 LTD — Public Website

A static marketing website for Florence Care 24 LTD, a UK care staffing and recruitment agency.

## Overview

This repository contains the front-end files for the public website, including:

- `index.html` — main homepage with hero, services, approach, team, and contact section
- `home.html` — alternate home page layout using the same styling
- `vacancies.html` — careers page with job cards and a modal application form
- `wwwroot/style/home.css` — shared site styling and responsive layout
- `wwwroot/style/vacancies.css` — careers page styling
- `wwwroot/script/home.js` — menu behavior, animations, and contact form submission
- `wwwroot/script/vacancies.js` — vacancy modal handling and application submission

## Features

- Responsive desktop, tablet, and mobile layout
- Animated hero section and scroll-triggered effects
- Mobile hamburger menu and overlay navigation
- Contact form handling via Google Apps Script
- Vacancy page application modal with CV upload support

## Local usage

The site is static and can be opened directly in a browser. For best results:

1. Open `index.html` or `home.html` in a browser
2. Verify assets load from `wwwroot/`
3. Use a simple local server if needed, for example:
   - Python 3: `python -m http.server 8000`
   - Node.js: `npx serve .`

## Contact & application forms

The contact form and vacancy application form are configured to post to Google Apps Script web apps.

### Contact form

The contact form in `index.html` currently posts to a Google Apps Script endpoint. The script should validate a secret key, detect spam via a hidden `website` field, and send an email using `GmailApp.sendEmail`.

### Vacancy application form

The vacancy form in `vacancies.html` submits applicant details and a CV upload. The current implementation converts the CV to base64 client-side and sends it through hidden form fields:

- `cv_data`
- `cv_filename`
- `cv_content_type`

The Apps Script saves the file to Google Drive using the configured folder ID and includes a shareable CV link in the notification email.

## Updating the Google Apps Script

If you need to update the apps script, use the following folder ID in your script:

- `1fEoPorlAdl3XXU_UT6bPNu4NAZHQF_NS`

Make sure the script is deployed as a web app with access set to "Anyone, even anonymous" or the appropriate access level for your form.

## Notes

- Keep the secret key in sync between `vacancies.html` and the Apps Script.
- The `vacancies.js` file includes a reset flow to clear the form after submission.
- The static site uses `wwwroot/images/`, `wwwroot/style/`, and `wwwroot/script/` for assets.

## License

This project is intended for client use and internal development; add license terms if needed.

