// src/registry.js

//--content 
import { TitleAndSubtitleSlide } from "../templates/TitleAndSubtitleSlide.js";
import { TitleAndParaSlide } from "../templates/TitleAndParaSlide.js";
import { BulletListSlide } from "../templates/BulletListSlide.js";
import { TwoColumnTextSlide } from "../templates/TwoColumnTextSlide.js";
//--image
import { ImageSlide } from "../templates/ImageSlide.js";
import { FillImageSlide } from "../templates/FillImageSlide.js";
import { ImageWithTitleSlide } from "../templates/ImageWithTitleSlide.js";
import { ImageWithCaptionSlide } from "../templates/ImageWithCaptionSlide.js";
import { ImageLeftBulletsRightSlide } from "../templates/ImageLeftBulletsRightSlide.js";
import { ImageRightBulletsLeftSlide } from "../templates/ImageRightBulletsLeftSlide.js";
//--table
import { TableSlide } from "../templates/TableSlide.js";
//--side slides/ charts
import { BarChartSlide } from "../templates/BarChartSlide.js";
import { Progressbar } from "../templates/Progressbar.js";
import { QuoteSlide } from "../templates/QuoteSlide.js";
import { KeyIdeasSlide } from "../templates/KeyIdeasSlide.js";
import { FocusListSlide } from "../templates/FocusList.js";
import { ImageStripSlide } from "../templates/ImagesStrip.js";
import { ImageGridSlide } from "../templates/ImageGrid.js";
import { TextGridSlide } from "../templates/TextGrid.js";

//--player-only
import { SkeletonSlide } from "../templates/SkeletonSlide.js";
import { EqSlide } from "../templates/EqSlide.js";

export const SlideRegistry = {
  titleAndSubtitle: TitleAndSubtitleSlide,
  titleAndPara: TitleAndParaSlide,
  bulletList: BulletListSlide,
  twoColumnText: TwoColumnTextSlide,

  imageSlide: ImageSlide,
  fillImage: FillImageSlide,
  imageWithTitle: ImageWithTitleSlide,
  imageWithCaption: ImageWithCaptionSlide,
  imageLeftBulletsRight: ImageLeftBulletsRightSlide,
  imageRightBulletsLeft: ImageRightBulletsLeftSlide,

  table: TableSlide,
  barChart: BarChartSlide,
  progressbar: Progressbar,

  quoteSlide: QuoteSlide,
  keyIdeasSlide: KeyIdeasSlide,

  eq: EqSlide,
  skeleton: SkeletonSlide,
  focusList: FocusListSlide,
  imageStrip: ImageStripSlide,
  imageGrid: ImageGridSlide,
  textGrid: TextGridSlide,
};
