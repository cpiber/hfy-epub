declare namespace reddit {
  interface wikipage {
    kind: 'wikipage',
    data: {
      content_md: string;
      may_revise: boolean;
      reason: string;
      revision_date: number;
      revision_by: {}; // XXX: incomplete
      revision_id: string;
      content_html: string;
    }
  }

  interface post {
    0: listing<t3>,
    1: listing<t1>,
  }

  interface listing<Inner> {
    kind: 'listing',
    data: {
      after: null, // XXX: type?
      before: null, // XXX: type?
      dist: number,
      modhash: string,
      geo_filter: string,
      children: Inner[],
    },
  }

  interface t3 {
    kind: 't3',
    data: {
      // XXX: incomplete
      selftext: string,
      title: string,
      selftext_html: string,
      id: string,
      author: string,
      url: string,
    }
  }

  interface t1 {
    kind: 't1',
    data: {
      // XXX: incomplete
      body: string,
      body_html: string,
    }
  }
}