class Store {
  constructor() {
    this.sources = [];
    this.listeners = {};
    
    this.pool = {};
  }
  
  addSource(source) {
    this.sources.push(source);
  }
  
  start() {
    for (let s of this.sources) {
      s.dispatch();
    }
  }
  
  addFilter(src_tag, filter, dst_tag) {
    // listen tag and execute filter
    const listener = {
      onDispatch: (input) => {
        const output = filter(input);
        this.dispatch(dst_tag, output);
      }
    };
    this.addListener(src_tag, listener);
  }
  
  addFilter2(src_tag1, src_tag2, filter2, dst_tag) {
    // almost same. but remain stupid for readable.
    const listener1 = {
      onDispatch: (input) => {
        if (this.pool[src_tag2]) {
          const output = filter2(this.pool[src_tag2], input);
          this.dispatch(dst_tag, output);
        }
      }
    };
    const listener2 = {
      onDispatch: (input) => {
        if (this.pool[src_tag1]) {
          const output = filter2(this.pool[src_tag1], input);
          this.dispatch(dst_tag, output);
        }
      }
    };
    this.addListener(src_tag1, listener1);
    this.addListener(src_tag2, listener2);
  }
  
  addListener(src_tag, listener) {
    if (!this.listeners[src_tag]) {
      this.listeners[src_tag] = [];
    }
    this.listeners[src_tag].push(listener);
  }
  
  dispatch(src_tag, input) {
    // save current input for tag
    this.pool[src_tag] = input;

    const listeners = this.listeners[src_tag];
    if (listeners) {
      for (let l of listeners) {
        l.onDispatch(input);
      }
    }
  }
}

class Composer {
  constructor() {
    this.store = new Store();
    this.tag_count = 0;
  }

  makeSource(input) {
    const dst_tag = 'tag' + (this.tag_count++);
    const component = (
      <Figure lines={input} clickable={true} store={this.store} dst_tag={dst_tag} />
    );
    return {component: component, tag: dst_tag};
  }
  
  addFilter(in_, filter) {
    const dst_tag = 'tag' + (this.tag_count++);
    this.store.addFilter(in_.tag, filter, dst_tag);
    
    const component = (
      <span>
        {in_.component}
        <Filter name={filter.name.toUpperCase()} />
        <Figure store={this.store} src_tag={dst_tag} />
      </span>
    );
    return {component: component, tag: dst_tag};
  }

  addFilter2(in1, in2, filter) {
    const dst_tag = 'tag' + (this.tag_count++);
    this.store.addFilter2(in1.tag, in2.tag, filter, dst_tag);
    
    const component = (
      <span>
        <VerticalLayout>
          {in1.component}
          {in2.component}
        </VerticalLayout>
        <Filter2 name={filter.name.toUpperCase()} />
        <Figure store={this.store} src_tag={dst_tag} />
      </span>
    );
    return {component: component, tag: dst_tag};
  }
}
