dist/shogi-board.js: src/shogi-board.js src/jsmbu/mbu.pl
	mkdir -p dist
	perl src/jsmbu/mbu.pl < $< > $@
