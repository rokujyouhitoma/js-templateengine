THIRD=third_party

init:
	@if [ ! -d $(THIRD) ]; then \
		echo "mkdir $(THIRD)"; mkdir $(THIRD); \
	fi
	@if [ ! -d build ]; then \
		echo "mkdir build"; mkdir  build; \
	fi
	cd $(THIRD); git clone https://github.com/facebook/tornado.git tornado
	cd $(THIRD); git clone https://code.google.com/p/closure-compiler-git closure-compiler-git; cd closure-compiler-git; ant jar

update:
	cd $(THIRD); cd tornado; git pull
	cd $(THIRD); cd closure-compiler-git; git pull

test:
	jasmine-node tests

js:
	java -jar $(THIRD)/closure-compiler-git/build/compiler.jar --charset=UTF-8 --jscomp_error=checkTypes --compilation_level ADVANCED_OPTIMIZATIONS --js src/template/template.js --js_output_file build/compiled.js
