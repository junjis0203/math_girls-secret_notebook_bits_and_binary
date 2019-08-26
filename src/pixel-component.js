'use strict';

const expandLine = (line) => {
  const expanded = [];
  for (let i = 0; i < 16; i++) {
    expanded.push((line >> (15-i)) & 1);
  }
  return expanded;
};

const expandLines = (lines) => {
  return lines.map((line) => expandLine(line));
};

const unexpandLine = (line) => {
  let unexpanded = 0;
  for (let i = 0; i < 16; i++) {
    unexpanded |= (line[i] << (15-i));
  }
  return unexpanded;
};

const unexpandLines = (lines) => {
  return lines.map((line) => unexpandLine(line));
};

const blankLines = () => {
  const lines = [];
  for (let i = 0; i < 16; i++) {
    lines.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  return lines;
};

class Figure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {lines: this.props.lines ? expandLines(this.props.lines) : blankLines()};
    
    // output
    if (this.props.store && this.props.dst_tag) {
      this.props.store.addSource(this);
    }
    
    // input
    if (this.props.store && this.props.src_tag) {
      this.props.store.addListener(this.props.src_tag, this);
    }
  }

  // output
  dispatch() {
    if (this.props.store && this.props.dst_tag) {
      this.props.store.dispatch(this.props.dst_tag, unexpandLines(this.state.lines));
    }
  }

  // input
  onDispatch(lines) {
    this.setState({lines: expandLines(lines)});
  }

  pixels(y, line) {
    const components = [];
    for (let i = 0; i < 16; i++) {
      let classNames = 'pixel';
      classNames += ' ';
      classNames += line[i] ? 'pixel-black' : 'pixel-white';
      const handler = () => {
        const lines = this.state.lines;
        lines[y][i] = lines[y][i] ? 0 : 1;
        this.setState({lines: lines});
        this.dispatch();
      };
      const component = (
        <span key={i} className={classNames} onClick={this.props.clickable ? handler : null}></span>
      );
      components.push(component);
    }
    return components;
  }

  lines() {
    const lines = this.state.lines;
    const components = [];
    for (let i = 0; i < 16; i++) {
      const component = (
        <div key={i} className={'pixel-line'}>
          {this.pixels(i, lines[i])}
        </div>
      );
      components.push(component);
    }
    return components;
  }

  render() {
    return (
      <div className={'figure'} ref={this.figure}>
        {this.lines()}
      </div>
    );
  }
}

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'filter-wrapper'}>
        <div className={'filter-before'} />
        <div className={'filter'}>
          {this.props.name}
        </div>
        <div className={'filter-after'} />
      </div>
    );
  }
}

class Filter2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'filter2-wrapper'}>
        <div className={'filter2-before'} />
        <div className={'filter2'}>
          {this.props.name}
        </div>
        <div className={'filter2-after'} />
      </div>
    );
  }
}

class VerticalLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='vertical-layout'>
        {React.Children.map(this.props.children, child => <div className={'vertical-layout-child'}>{child}</div>)}
      </div>
    );
  }
}
