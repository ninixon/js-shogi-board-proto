dist/shogi-board.js: med/shogi-board.js util/jsmbu/mbu.pl
	mkdir -p dist
	sed -e '/^#/d' < $< | perl util/jsmbu/mbu.pl > $@
med/shogi-board.js: src/shogi-board.js src/shogi-board-impl.js
	mkdir -p med
	gcc -x c -E $< -o $@
