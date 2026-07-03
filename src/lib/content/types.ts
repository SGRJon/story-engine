// CREATE: src/lib/content/types.ts
//
// This is the schema every story in the engine conforms to. A Beat has one
// required primary block (shown on first tap) and an optional array of
// deeper blocks (shown when the reader taps "go deeper"). Both draw from
// the same six Block types, so nothing gets built twice.

export type Block =
	| { type: 'text'; body: string; emphasis?: boolean }
	| { type: 'quote'; body: string; attribution?: string }
	| { type: 'phoneMock'; label?: string; lines: string[] }
	| { type: 'grid'; items: { label: string }[] }
	| { type: 'table'; headers: string[]; rows: string[][] }
	| { type: 'transition'; body: string; paletteShift?: boolean };

export interface Beat {
	id: string;
	index: number;
	act: 'cold-open' | 'experience' | 'engine' | 'product' | 'close';
	primary: Block;
	deeper?: Block[];
	// True only on the beat where the logo lands and the chapter bar
	// first appears (beat 3 in the FindMe spine). Every other beat
	// leaves this unset.
	revealsChapterBar?: boolean;
	showsLogo?: boolean;
}

export interface StoryAct {
	id: string;
	label: string;
	// The index of the first beat belonging to this act, so the
	// chapter bar can highlight the right section as the reader
	// taps through and jump-to-chapter can land on the right beat.
	startBeat: number;
}

export interface Story {
	slug: string;
	title: string;
	theme: string;
	// Whether this story sits behind the lightweight per-story
	// passphrase gate before a reader reaches beat 1.
	passphraseGate: boolean;
	acts: StoryAct[];
	beats: Beat[];
}
