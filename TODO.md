# Fix Login Timing Error - Progress Tracker

## Plan Summary
- Root cause: Slow sync bcrypt in backend + no fetch timeout in frontend → network error on slow logins.
- Fixes: Async bcrypt (rounds=8), frontend 10s timeout + better errors, server timeout middleware.

## Steps:
- [x] 1. Create this TODO.md
- [x] 2. Update e-arsip-desa/controllers/authController.js (async bcrypt)
- [ ] 3. Update src/app/components/LoginPage.tsx (fetch timeout, better errors)
- [ ] 4. Update e-arsip-desa/server.js (request timeout middleware)
- [ ] 5. Test backend/frontend login timing
- [ ] 6. Verify no more 'Terjadi kesalahan' on slow networks

**Next:** Edit authController.js (primary slowdown).

Approve to proceed or changes?
