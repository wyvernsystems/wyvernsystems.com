import { Component } from "react";

/**
 * Catches render/effect errors in purely decorative children (canvas rain,
 * SVG backdrop) so a failure there can never blank the actual page content.
 */
export default class DecorativeBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("Decorative layer failed; continuing without it.", error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
