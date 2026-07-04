export type Block =
	| { type: 'text'; body: string; emphasis?: boolean }
	| { type: 'quote'; body: string; attribution?: string }
	| { type: 'phoneMock'; label?: string; lines: string[]; typing?: boolean }
	| { type: 'grid'; items: { label: string; icon?: string }[] }
	| { type: 'table'; headers: string[]; rows: string[][] }
	| { type: 'transition'; body: string; paletteShift?: boolean };

export interface Beat {
	id: string;
	index: number;
	act: 'cold-open' | 'experience' | 'engine' | 'product' | 'close';
	primary: Block;
	// An always-visible block rendered directly below the primary,
	// no tap required. For beats where a statement and its
	// illustration belong on screen together.
	support?: Block;
	deeper?: Block[];
	revealsChapterBar?: boolean;
	showsLogo?: boolean;
}

export interface StoryAct {
	id: string;
	label: string;
	startBeat: number;
}

export interface Story {
	slug: string;
	title: string;
	theme: string;
	// Path to this story's favicon under /static, e.g.
	// '/favicons/findme.svg'. Each story route declares it in its
	// page head, overriding the site default.
	favicon?: string;
	passphraseGate: boolean;
	acts: StoryAct[];
	beats: Beat[];
}
