import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  CSSProperties,
} from "react";

import Highcharts from "highcharts";

interface Props {
  options: Highcharts.Options;
  constructorType?: "chart" | "ganttChart";
  updateArgs?: [boolean] | [boolean, boolean] | [boolean, boolean, boolean];
  width?: number;
  height?: number;
  style?: CSSProperties;
  immutable?: boolean;
  catchError?: boolean;
  callback?: (chart: Highcharts.Chart) => void;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const HighchartsChart = memo<Props>(
  forwardRef(function HighchartsChart(
    {
      options = null,
      constructorType = "chart",
      updateArgs = [true, true, true],
      callback = () => {},
      width = "100%",
      height = "auto",
      style = {},
      immutable = false,
      catchError = false,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Highcharts.Chart>(null);

    useIsomorphicLayoutEffect(() => {
      function createChart() {
        const H = window.Highcharts;

        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }

        if (!H) {
          console.warn("HighchartsChart: Highcharts not found.");
        } else if (!H[constructorType]) {
          console.warn(
            `HighchartsChart: Highcharts.${constructorType} not found.`
          );
        } else if (!options) {
          console.warn("HighchartsChart: options are required.");
        } else {
          chartRef.current = H[constructorType](
            containerRef.current,
            options,
            callback
          );
        }
      }

      try {
        if (!chartRef.current || immutable) {
          createChart();
        } else {
          chartRef.current.update(options, ...updateArgs);
        }
      } catch (error) {
        if (!catchError) {
          throw error;
        } else {
          console.error(error);
        }
      }
    }, [options]);

    useIsomorphicLayoutEffect(() => {
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        container: containerRef,
        get chart() {
          return chartRef.current;
        },
      }),
      []
    );

    React.useEffect(() => {
      if (chartRef.current) {
        chartRef.current.reflow();
      }
    }, [width, height]);

    return <div ref={containerRef} style={{ ...style, width, height }} />;
  })
);
