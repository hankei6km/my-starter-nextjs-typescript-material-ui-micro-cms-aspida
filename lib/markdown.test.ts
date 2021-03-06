import { processorMarkdownToHtml } from './markdown';
import { normalizedHtml } from './html';

describe('markdownToHtml()', () => {
  it('should convert markdown to html', () => {
    expect(
      normalizedHtml(processorMarkdownToHtml(), '## test\ntext text text.')
    ).toEqual('<h2>test</h2><p>text text text.</p>');
    expect(
      normalizedHtml(
        processorMarkdownToHtml(),
        '## test\n[unified](https://unifiedjs.com/).'
      )
    ).toEqual(
      '<h2>test</h2><p><a href="https://unifiedjs.com/">unified</a>.</p>'
    );
  });
  it('should convert markdown-gfm to html', () => {
    expect(
      normalizedHtml(
        processorMarkdownToHtml(),
        '## test\n* [ ] to do\n* [x] done'
      )
    ).toEqual(
      '<h2>test</h2><ul><li class="task-list-item"><input type="checkbox" disabled> to do</li><li class="task-list-item"><input type="checkbox" checked disabled> done</li></ul>'
    );
  });
  it('should convert markdown to sinitized html', () => {
    expect(
      normalizedHtml(
        processorMarkdownToHtml(),
        '## test\n[click here](javascript:alret("test")).'
      )
    ).toEqual('<h2>test</h2><p><a>click here</a>.</p>');
  });
});
