import { CITY_NAMES } from '../../data/city-names';

const SUGGESTION_LIMIT = 3;
// const MIN_SEARCH_WORD_LENGTH = 3;

class TrieNode {
  value!: string;
  terminus!: boolean;
  children!: TrieNode[];

  constructor(str: string) {
    this.children = [];
    this.terminus = false;
    this.value = str.charAt(0) ?? '';
    if (str.length > 1) {
      this.children.push(new TrieNode(str.substring(1)));
    } else {
      this.terminus = true;
    }
  }

  add(str: string) {
    const value = str.charAt(0);
    const next = str.substring(1);
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.value === value) {
        if (next) {
          child.add(next);
        } else {
          child.terminus = true;
        }
        return;
      }
    }
    this.children.push(new TrieNode(str));
  }

  _complete(search: string, built: string, suggestions: string[]): string[] {
    // if (search && search[0] !== this.value) {
    //   return suggestions;
    // }
    if (suggestions.length >= SUGGESTION_LIMIT || (search && search[0] !== this.value)) {
      return suggestions;
    }
    if (this.terminus) {
      suggestions.push(`${built}${this.value}`);
    }
    // for (let i = 0; i < this.children.length; i++) {
    //   const child = this.children[i];
    //   suggestions = child._complete(search.substring(1), `${built}${this.value}`, suggestions);
    // }
    this.children.forEach((child) => child._complete(search.substring(1), `${built}${this.value}`, suggestions));
    return suggestions;
  }

  complete(str: string) {
    // if (str.length < MIN_SEARCH_WORD_LENGTH) {
    //   return [];
    // }
    let completions: string[] = [];
    // for (let i = 0; i < this.children.length; i++) {
    //   const child = this.children[i];
    //   completions = completions.concat(child._complete(str, '', []))
    // }
    this.children.forEach((child) => (completions = completions.concat(child._complete(str, '', []))));
    return completions;
  }
}

function createTrie(words: string[]): TrieNode {
  const root = new TrieNode('');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    root.add(word.toLowerCase());
  }

  return root;
}

describe('tries', function () {
  it('dataset of 10 - san', () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete('san');
    expect(completions.length).toBe(3);
    expect(completions.includes('san antonio')).toBeTruthy();
    expect(completions.includes('san diego')).toBeTruthy();
    expect(completions.includes('san jose')).toBeTruthy();
  });

  it('dataset of 10 - philadelph', () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete('philadelph');
    expect(completions.length).toBe(1);
    expect(completions.includes('philadelphia')).toBeTruthy();
  });

  it('dataset of 25 - d', () => {
    const root = createTrie(CITY_NAMES.slice(0, 25));
    const completions = root.complete('d');
    expect(completions.length).toBe(3);
    expect(completions.includes('dallas')).toBeTruthy();
    expect(completions.includes('detroit')).toBeTruthy();
    expect(completions.includes('denver')).toBeTruthy();
  });

  it('dataset of 200 - new', () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete('new');
    expect(completions.length).toBe(3);
    expect(completions.includes('new york')).toBeTruthy();
    expect(completions.includes('new orleans')).toBeTruthy();
    expect(completions.includes('new haven')).toBeTruthy();
    expect(completions.includes('newark')).not.toBeTruthy();
    expect(completions.includes('newport news')).not.toBeTruthy();
  });

  it('dataset of 200 - bo', () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete('bo');
    expect(completions.length).toBe(2);
    expect(completions.includes('boston')).toBeTruthy();
    expect(completions.includes('boise city')).toBeTruthy();
  });

  it('dataset of 500 - sal', () => {
    const root = createTrie(CITY_NAMES.slice(0, 500));
    const completions = root.complete('sal');
    expect(completions.includes('salt lake city')).toBeTruthy();
    expect(completions.includes('salem')).toBeTruthy();
    expect(completions.includes('salinas')).toBeTruthy();
    expect(completions.length).toBe(3);
  });

  it('handle whole words - seattle', () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete('seattle');
    expect(completions.length).toBe(1);
    expect(completions.includes('seattle')).toBeTruthy();
  });

  it('handle no match', () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete('no match');
    expect(completions.length).toBe(0);
  });

  it('handle words that are a subset of another string - salin', () => {
    const root = createTrie(CITY_NAMES.slice(0, 800));
    const completions = root.complete('salin');
    expect(completions.length).toBe(2);
    expect(completions.includes('salina')).toBeTruthy();
    expect(completions.includes('salinas')).toBeTruthy();
  });
});
