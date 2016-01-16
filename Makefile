dist/shogi-board.js: src/shogi-board.js.in src/mbu.pl
	mkdir -p dist
	perl src/mbu.pl < $< > $@
