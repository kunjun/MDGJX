
// Date: Fri, 17 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, delayFN } from "../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../utils/LogUtils";
import _ from "lodash";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../../utils/PageUtils";
import "allotment/dist/style.css";
import { Allotment, AllotmentHandle } from "allotment";
import exportUtils from "../../../../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../../../../../../reducers/systemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
  URL_WORKBENCH_WORKSPACE,
} from "../../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../../reducers/apiSlice";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../../../../types/workbench-types";
import { FunctionalMenu } from "../nav/functional";
import { SidebarMenu } from "../nav/sidebar/Biz_SidebarMenu";
import Biz_DrawerMenu from "../nav/control";
import layoutSlice from "../../../../../../reducers/layoutSlice";
import {
  FN_CLOSE_LTR_MENU,
  FN_SHOW_LTR_MENU,
} from "../nav/functional/panel-group/controls/FunctionalControls";
import GenCodeMirror from "../../../../../../components/GenCodeMirror";
import GenHorizontalTab from "../../../../../../components/GenHorizontalTab";
import ToolCenterView from "./center-view/tools/ToolCenterView";
import NotesCenterView from "./center-view/notes/NotesCenterView";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../../../../types/workbench-hook";
import OtherCenterView from "./center-view/other/OtherCenterView";
let mappings = {
  tools: ToolCenterView,
  notes: NotesCenterView
};

export let InnerCenterView = () => {
  let sq = useSearchQuery();
  let TargetEle = mappings[sq.l + ""] || OtherCenterView;
  return (
    <div className="w-full h-full">
      <TargetEle />
    </div>
  );
};
