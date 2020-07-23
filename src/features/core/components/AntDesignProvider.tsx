import * as React from "react";
import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { useTranslation } from "../../..";

export function AntDesignProvider({ children }) {
  const { locale } = useLocale();

  return <ConfigProvider locale={locale} children={children} />;
}

function useLocale(): ConfigProviderProps {
  const t = useTranslation();

  return React.useMemo(() => {
    const config: ConfigProviderProps = {
      locale: {
        locale: t("antd:locale"),
        Pagination: {
          items_per_page: t("antd:pagination_items_per_page"),
          jump_to: t("antd:pagination_jump_to"),
          jump_to_confirm: t("antd:pagination_jump_to_confirm"),
          page: t("antd:pagination_page"),
          prev_page: t("antd:pagination_prev_page"),
          next_page: t("antd:pagination_next_page"),
          prev_5: t("antd:pagination_prev_5"),
          next_5: t("antd:pagination_next_5"),
          prev_3: t("antd:pagination_prev_3"),
          next_3: t("antd:pagination_next_3"),
        },
        DatePicker: {
          lang: {
            locale: t("antd:locale_moment"),
            placeholder: t("opendash:ui.select_date"),
            rangePlaceholder: [
              t("opendash:ui.start_date"),
              t("opendash:ui.end_date"),
            ],
            today: t("opendash:ui.today"),
            now: t("opendash:ui.now"),
            backToToday: t("antd:datepicker_back_to_today"),
            ok: t("opendash:ui.ok"),
            clear: t("opendash:ui.reset"),
            month: t("opendash:ui.month"),
            year: t("opendash:ui.year"),
            timeSelect: t("opendash:ui.select_time"),
            dateSelect: t("opendash:ui.select_date"),
            monthSelect: t("opendash:ui.select_month"),
            yearSelect: t("opendash:ui.select_year"),
            decadeSelect: t("opendash:ui.select_decade"),
            yearFormat: t("opendash:format.year"),
            dateFormat: t("opendash:format.date"),
            dayFormat: t("opendash:format.day"),
            dateTimeFormat: t("opendash:format.datetime"),
            monthBeforeYear: true,
            previousMonth: t("antd:datepicker_previous_month"),
            nextMonth: t("antd:datepicker_next_month"),
            previousYear: t("antd:datepicker_previous_year"),
            nextYear: t("antd:datepicker_next_year"),
            previousDecade: t("antd:datepicker_previous_decade"),
            nextDecade: t("antd:datepicker_next_decade"),
            previousCentury: t("antd:datepicker_previous_century"),
            nextCentury: t("antd:datepicker_next_century"),
          },
          timePickerLocale: {
            placeholder: t("opendash:ui.select_time"),
          },
        },
        TimePicker: {
          placeholder: t("opendash:ui.select_time"),
        },
        Calendar: {
          lang: {
            placeholder: t("opendash:ui.select_date"),
            rangePlaceholder: [
              t("opendash:ui.start_date"),
              t("opendash:ui.end_date"),
            ],
            today: t("opendash:ui.today"),
            now: t("opendash:ui.now"),
            backToToday: "Zurück zu Heute",
            ok: t("opendash:ui.ok"),
            clear: t("opendash:ui.reset"),
            month: t("opendash:ui.month"),
            year: t("opendash:ui.year"),
            timeSelect: t("opendash:ui.select_time"),
            dateSelect: t("opendash:ui.select_date"),
            monthSelect: t("opendash:ui.select_month"),
            yearSelect: t("opendash:ui.select_year"),
            decadeSelect: t("opendash:ui.select_decade"),
            yearFormat: t("opendash:format.year"),
            dateFormat: t("opendash:format.date"),
            dayFormat: t("opendash:format.day"),
            dateTimeFormat: t("opendash:format.datetime"),
            monthBeforeYear: true,
            previousMonth: t("antd:datepicker_previous_month"),
            nextMonth: t("antd:datepicker_next_month"),
            previousYear: t("antd:datepicker_previous_year"),
            nextYear: t("antd:datepicker_next_year"),
            previousDecade: t("antd:datepicker_previous_decade"),
            nextDecade: t("antd:datepicker_next_decade"),
            previousCentury: t("antd:datepicker_previous_century"),
            nextCentury: t("antd:datepicker_next_century"),
          },
          timePickerLocale: {
            placeholder: t("opendash:ui.select_time"),
          },
        },
        Table: {
          filterTitle: t("opendash:ui.filter"),
          filterConfirm: t("opendash:ui.ok"),
          filterReset: t("opendash:ui.reset"),
          selectAll: t("opendash:ui.select_all"),
          selectInvert: t("opendash:ui.select_invert"),
        },
        Modal: {
          okText: t("opendash:ui.ok"),
          cancelText: t("opendash:ui.cancel"),
          justOkText: t("opendash:ui.ok"),
        },
        Popconfirm: {
          okText: t("opendash:ui.ok"),
          cancelText: t("opendash:ui.cancel"),
        },
        Transfer: {
          searchPlaceholder: t("antd:transfer_search"),
          itemUnit: t("antd:transfer_item_unit"),
          itemsUnit: t("antd:transfer_item_unit_plural"),
        },
        Upload: {
          uploading: t("antd:upload_uploading"),
          removeFile: t("antd:upload_remove"),
          uploadError: t("antd:upload_error"),
          previewFile: t("antd:upload_preview"),
        },
        Empty: {
          description: t("opendash:ui.no_data"),
        },
      },
    };

    return config;
  }, [t]);
}
