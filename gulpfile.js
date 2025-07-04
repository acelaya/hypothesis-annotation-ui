import { buildCSS, runTests, watchJS } from '@hypothesis/frontend-build';
import gulp from 'gulp';

// The following tasks bundle assets for the pattern library for use locally
// during development. Bundled JS and CSS are not published with the package.

gulp.task(
  'watch-css',
  gulp.series('bundle-css', () =>
    gulp.watch(
      [
        './styles/**/*.scss',
        './src/components/**/*.js',
        './src/components/**/*.ts*',
        './src/pattern-library/**/*.js',
        './src/pattern-library/**/*.ts*',
      ],
      gulp.task('bundle-css'),
    ),
  ),
);

gulp.task('watch-js', () => watchJS('./rollup.config.js'));

gulp.task(
  'watch',
  gulp.parallel('serve-pattern-library', 'watch-css', 'watch-js'),
);

/**
 * Task to build a CSS bundle.
 *
 * nb. This is only used for unit tests that need CSS to verify accessibility requirements.
 */
gulp.task('build-test-css', () =>
  buildCSS(['styles/test.scss'], { tailwindConfig }),
);

// Some (eg. a11y) tests rely on CSS bundles. We assume that JS will always take
// longer to build than CSS, so build in parallel.
gulp.task(
  'test',
  gulp.parallel('build-test-css', () =>
    runTests({
      bootstrapFile: 'test/bootstrap.js',
      rollupConfig: 'rollup-tests.config.js',
      vitestConfig: 'vitest.config.js',
      testsPattern: 'src/**/*-test.js',
    }),
  ),
);
