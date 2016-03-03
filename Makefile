CPP=/usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C
dist/shogi-board.js: med/shogi-board.js util/jsmbu/mbu.pl
	mkdir -p dist
	perl util/jsmbu/mbu.pl < $< > $@
med/shogi-board.js: src/shogi-board.js src/shogi-board-impl.js
	mkdir -p med
	$(CPP) -Isrc < $< > $@
