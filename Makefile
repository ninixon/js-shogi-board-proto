subdirs := cesdecode
.PHONY: all clean $(subdirs)

all: dist/shogi-board.js

clean:
	rm -rf med
	rm -rf dist

$(subdirs):
	make -C $@

CPP=/usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C

dist/shogi-board.js: med/shogi-board.js util/jsmbu/mbu.pl
	mkdir -p dist
	perl util/jsmbu/mbu.pl < $< > $@

IMPLJS= \
src/viewer-svg-impl.js \
src/parser-kif-impl.js \
src/board-impl.js \
src/control-impl.js \

EXTJS= \
cesdecode/med/cesdecodecp932-impl.js \

med/shogi-board.js: src/shogi-board.js $(IMPLJS) $(EXTJS)
	mkdir -p med
	$(CPP) -Isrc -Icesdecode/med < $< > $@


cesdecode/med/cesdecodecp932-impl.js: cesdecode
