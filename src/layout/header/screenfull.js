/**
 * 全屏插件
 */

import React from "react";
import style from "@/layout/index.module.css";
import screenfull from "screenfull";

export default class Screenfull extends React.Component {
  state = {
    isFullscreen: false,
  };

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.destroy();
  }

  init = () => {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.change);
    }
  };
  destroy = () => {
    if (screenfull.isEnabled) {
      screenfull.off("change", this.change);
    }
  };
  change = () => {
    this.setState({
      isFullscreen: screenfull.isFullscreen,
    });
  };

  click = () => {
    if (!screenfull.isEnabled) {
      this.$message({
        message: "you browser can not work",
        type: "warning",
      });
      return false;
    }
    screenfull.toggle();
  };

  render() {
    return (
      <div className={style.link} onClick={this.click}>
        {this.state.isFullscreen ? (
          <svg
            t="1594027490868"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1665"
            width="24"
            height="24"
          >
            <path
              d="M344.056 647.377c9.149-1.422 18.828 1.391 25.877 8.44 6.054 6.054 8.983 14.05 8.797 21.982v174.763h-60.074l-0.001-104.389-150.176 150.176L126 855.87l148.342-148.343-112.305 0.002v-60.075h181.546z m310.783 7.358c7.17-7.17 17.062-9.957 26.35-8.362h181.545v60.074l-108.816-0.001 143.631 143.631-42.479 42.48-148.954-148.955V851.48h-60.075V676.718c-0.186-7.933 2.744-15.928 8.798-21.983z m51.278 51.711l-0.001 2.954 2.954-2.954h-2.953z m-387.462 1.082l-1.164-0.001 1.164 1.164v-1.163zM853.94 127.93l42.48 42.48L747.88 318.946h114.853v60.074H681.188c-9.287 1.595-19.18-1.192-26.349-8.362-6.054-6.054-8.984-14.05-8.788-21.983h-0.01V173.914h60.075v101.839l147.823-147.822zM173.472 126l145.805 145.805 0.001-97.891h60.075v174.762c0.186 7.933-2.744 15.929-8.798 21.983-7.048 7.048-16.728 9.861-25.876 8.44l-0.473-0.078H162.66v-60.074h118.8L130.993 168.479 173.472 126z m145.805 190.166l-2.781 2.781h2.781v-2.781z"
              p-id="1666"
            ></path>
          </svg>
        ) : (
          <svg
            t="1594027506510"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1824"
            width="24"
            height="24"
          >
            <path
              d="M658.615 615.238L817.32 773.945l0.001-101.576h60.075v174.763c0.186 7.932-2.744 15.928-8.798 21.982-7.17 7.17-17.062 9.958-26.349 8.363H660.704v-60.075l115.117 0.001-159.685-159.685 42.479-42.48z m-286.124-7.723l42.48 42.48-167.41 167.408h113.126v60.074H179.14l-0.473 0.077c-9.149 1.422-18.828-1.391-25.876-8.44-6.055-6.054-8.984-14.05-8.798-21.982V672.369h60.075v103.567l168.422-168.421zM177.682 147.358l0.473 0.077h181.546v60.075l-108.817-0.002 165.218 165.217-42.48 42.48-170.539-170.54v107.878h-60.075V177.78c-0.186-7.932 2.744-15.928 8.798-21.982 7.048-7.048 16.728-9.862 25.876-8.44z m693.648 8.44c6.054 6.054 8.984 14.05 8.788 21.983h0.01v174.762h-60.075l-0.001-107.632-164.5 164.5-42.478-42.478 159.423-159.425-109.062 0.002v-60.075H844.98c9.287-1.594 19.18 1.193 26.349 8.363z"
              p-id="1825"
            ></path>
          </svg>
        )}
      </div>
    );
  }
}
