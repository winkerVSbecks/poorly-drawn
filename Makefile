install:
	cd functions/image && npm i
	cp ./libx86/* functions/image/node_modules/canvas/build/Release/
