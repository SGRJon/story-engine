import type { Story } from '../types';

// The approved 25-beat spine (originally 23, expanded to include the
// contact and reunion beats). Primary text is locked, refine only on
// request. Deeper content is condensed from the three client-facing
// discovery documents (UX walkthrough, architecture reveal, sourcing).

export const findme: Story = {
	slug: 'findme',
	title: 'FindMe',
	theme: 'findme-blue',
	passphraseGate: true,
	acts: [
		{ id: 'experience', label: 'Experience', startBeat: 4 },
		{ id: 'engine', label: 'Engine', startBeat: 12 },
		{ id: 'product', label: 'Product', startBeat: 19 }
	],
	beats: [
		{
			id: 'separated',
			index: 1,
			act: 'cold-open',
			primary: { type: 'text', body: 'A child gets separated from their parent in a crowded place.' }
		},
		{
			id: 'someone-helps',
			index: 2,
			act: 'cold-open',
			primary: {
				type: 'text',
				body: 'Someone wants to help. The next thirty seconds decide everything.'
			}
		},
		{
			id: 'findme-simple',
			index: 3,
			act: 'cold-open',
			primary: { type: 'text', body: 'FindMe makes those thirty seconds simple.', emphasis: true },
			showsLogo: true,
			revealsChapterBar: true
		},
		{
			id: 'helper-scans',
			index: 4,
			act: 'experience',
			primary: {
				type: 'text',
				body: "The helper points their phone at the wearable. That's it. No app. No instructions."
			}
		},
		{
			id: 'helpers-view',
			index: 5,
			act: 'experience',
			primary: {
				type: 'phoneMock',
				label: 'What the helper sees',
				lines: [
					"Hi, I'm a little lost.",
					'Please help me reach my grown up.',
					'[ Call ]',
					'[ Text ]'
				]
			}
		},
		{
			id: 'makes-contact',
			index: 6,
			act: 'experience',
			primary: {
				type: 'text',
				body: "The helper taps Call. A phone rings in a parent's pocket, thirty feet away."
			}
		},
		{
			id: 'reunion',
			index: 7,
			act: 'experience',
			primary: {
				type: 'quote',
				body: 'Reunited in minutes. The frantic search never happens.\n"Thank you, FindMe."',
				attribution: 'A parent, minutes later'
			}
		},
		{
			id: 'day-one-scan',
			index: 8,
			act: 'experience',
			primary: { type: 'text', body: 'Rewind to day one. One scan sets up everything.' },
			deeper: [
				{
					type: 'text',
					body: 'Most connected products make you do two things: create an account somewhere, then go add the device. FindMe collapses that into one motion. The first scan is the account setup and the wearable claim happening at once, no separate app to open first, no second registration step later.'
				}
			]
		},
		{
			id: 'no-password',
			index: 9,
			act: 'experience',
			primary: { type: 'text', body: 'No password to invent.' },
			deeper: [
				{
					type: 'text',
					body: "A create a password, confirm it, include a symbol screen is friction at the exact moment a distracted parent has the least patience for it. It's one of the most common places people simply give up. FindMe leads with a magic link or a one time code by email instead. Type an email, tap a link, done. A password can exist as a fallback. It should never be the front door."
				}
			]
		},
		{
			id: 'live-preview',
			index: 10,
			act: 'experience',
			primary: {
				type: 'phoneMock',
				label: 'Live preview',
				typing: true,
				lines: [
					"As the parent types, the helper's page updates in real time.",
					'Trust is built by showing, not promising.'
				]
			}
		},
		{
			id: 'four-wearables',
			index: 11,
			act: 'experience',
			primary: {
				type: 'text',
				body: "Four wearables on the counter? This is Jamie's. The system knows. It never guesses."
			},
			deeper: [
				{
					type: 'grid',
					items: [
						{
							label:
								'Unclaimed, not logged in: new or returning? Offer both doors, then claim.'
						},
						{
							label: 'Unclaimed, logged in: quick claim to this account. The four wearable case.'
						},
						{ label: 'Claimed, not logged in: helper view only.' },
						{
							label: 'Claimed by someone else: never silently reassign. First claim wins.'
						}
					]
				}
			]
		},
		{
			id: 'transition-engine',
			index: 12,
			act: 'engine',
			primary: {
				type: 'transition',
				body: "Everything you just felt only works because of what you can't see.",
				paletteShift: true
			}
		},
		{
			id: 'light-switch',
			index: 13,
			act: 'engine',
			primary: {
				type: 'quote',
				body: 'A switch wired to nothing turns on nothing. The value was always the wiring.'
			}
		},
		{
			id: 'empty-wearable',
			index: 14,
			act: 'engine',
			primary: {
				type: 'text',
				body: 'The wearable is deliberately empty. It holds one thing: a pointer.'
			},
			deeper: [
				{
					type: 'text',
					body: 'Each wearable holds one unique address, like /w/X7K9P2M4, and nothing else. No names, no numbers, no child data physically on the thing. The server looks up that address and decides what to show. Change a phone number once, and every future scan is correct, because the wearable never held the number to begin with. Remove the back end and the scan opens to a dead page.'
				}
			]
		},
		{
			id: 'privacy-enforced',
			index: 15,
			act: 'engine',
			primary: { type: 'text', body: "Privacy isn't displayed. It's enforced. Hidden data is never sent." },
			deeper: [
				{
					type: 'text',
					body: `The rule about what is public lives on the server, not on the page. The page only ever receives the already filtered, safe version. If that decision lived in the front end alone, a determined person could read what was hidden. Enforced on the server, the private data never travels at all. On a child product, *"the screen didn't show it"* isn't good enough. *"It was never sent"* is the standard.`
				}
			]
		},
		{
			id: 'first-claim-wins',
			index: 16,
			act: 'engine',
			primary: {
				type: 'text',
				body: "Once a family claims a wearable, it's theirs. Nobody else can ever claim it."
			},
			deeper: [
				{
					type: 'text',
					body: 'Not by accident, not by a second scan, not by someone with bad intent. The system checks ownership on every claim attempt, so a wearable already protecting a child can never be quietly taken over.'
				}
			]
		},
		{
			id: 'thousand-wearables',
			index: 17,
			act: 'engine',
			primary: {
				type: 'text',
				body: 'A thousand blank wearables must become a thousand that each open the right page.'
			},
			deeper: [
				{
					type: 'table',
					headers: ['Step', 'What happens'],
					rows: [
						[
							'1',
							'The system mints unique addresses. Each becomes an empty, unclaimed record, ready to be claimed later.'
						],
						[
							'2',
							'One button exports a clean, correctly formatted file for the manufacturer. No hand built spreadsheets, no transposed rows.'
						],
						[
							'3',
							'The factory encodes each wearable to match. Chips and printed codes carry the exact addresses the database expects.'
						],
						[
							'4',
							'The batch is verified before it sells. A sample is scanned and confirmed against real, unclaimed records before anything ships.'
						]
					]
				}
			]
		},
		{
			id: 'batch-verified',
			index: 18,
			act: 'engine',
			primary: { type: 'text', body: 'Every batch is verified before it sells.' }
		},
		{
			id: 'wearable-category',
			index: 19,
			act: 'product',
			primary: {
				type: 'text',
				body: 'Wearables are an entire category with multiple product lines.'
			},
			support: {
				type: 'grid',
				items: [
					{ label: 'Wristband', icon: 'wristband' },
					{ label: 'Shoe tag', icon: 'shoe-tag' },
					{ label: 'Zipper pull', icon: 'zipper-pull' },
					{ label: 'Pendant', icon: 'pendant' },
					{ label: 'Clothing tag', icon: 'clothing-tag' },
					{ label: 'Key fob', icon: 'key-fob' }
				]
			}
		},
		{
			id: 'code-survives',
			index: 20,
			act: 'product',
			primary: {
				type: 'text',
				body: 'The code must survive real life. A scuffed code is a silent failure.'
			},
			deeper: [
				{
					type: 'text',
					body: "QR and NFC solve different problems. QR works on any phone in a helper's hand, zero setup, that's the universal reach a lost child moment needs. NFC adds durability and a premium feel. FindMe uses both, encoded to the same address, so neither is the single point of failure. The code is laser etched or embedded, never surface printed."
				}
			]
		},
		{
			id: 'four-questions',
			index: 21,
			act: 'product',
			primary: { type: 'text', body: 'Four questions for any manufacturer, including yours.' },
			deeper: [
				{
					type: 'table',
					headers: ['#', 'Question we ask every manufacturer'],
					rows: [
						[
							'1',
							'Can you encode per unit variable data, a unique code on every piece, from our supplied list?'
						],
						['2', 'Is the code laser etched or embedded NFC, not surface printed?'],
						[
							'3',
							'Is the material skin safe, food grade silicone, with documented material safety certification?'
						],
						['4', 'Can you provide that certification on paper before we commit to a run?']
					]
				}
			]
		},
		{
			id: 'two-numbers',
			index: 22,
			act: 'product',
			primary: {
				type: 'text',
				body: "Two numbers worth separating. The gap is your margin, and it's healthier than you think."
			},
			deeper: [
				{
					type: 'table',
					headers: ['Quantity', 'Approx. cost per unit'],
					rows: [
						['50', '$3.00'],
						['100', '$2.00'],
						['250', '$1.25'],
						['500', '$0.95'],
						['1,000', '$0.70']
					]
				}
			]
		},
		{
			id: 'tech-solved',
			index: 23,
			act: 'close',
			primary: {
				type: 'quote',
				body: 'The technology is solved. The customer experience is everything.'
			}
		},
		{
			id: 'attorney-check',
			index: 24,
			act: 'close',
			primary: {
				type: 'text',
				body: "One box to check before the first dollar: an attorney's eyes on a child data product."
			}
		},
		{
			id: 'lets-build',
			index: 25,
			act: 'close',
			primary: { type: 'text', body: "Let's build it.", emphasis: true }
		}
	]
};
