TESTS = test/*.js
REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--require should \
		--require test/common.js \
		--reporter $(REPORTER) \
		--growl \
		--timeout 5000
		$(TESTS)

.PHONY: test bench
