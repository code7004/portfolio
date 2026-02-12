import { useCurrentRoute } from "@/@core/routeToolkit";
import { TxCoolTable, TxCoolTableScroller, TxPagenation } from "@/@core/tx-ui";
import { PageLayout } from "@/components/PageLayout";
import { RouteData } from "@/config/RouteData";
import { useState } from "react";

const ITEMSIZE = 50;

const num = () => Math.floor(Math.random() * 1000);

const Board = () => {
  const route = useCurrentRoute(RouteData);
  const [vdata, _vdata] = useState(Array.from({ length: 1000 }).map(e => ({ idx: e, korea: num(), japan: num(), usa: num(), usa2: num(), usa3: num() })));
  const [pageIdx, _pageIdx] = useState(1);
  const [itemCount, _itemCount] = useState(0);

  return (
    <PageLayout className="flex flex-col p-4">
      <h1 className="font-bold">{`${route.data.icon} ${route.data.name}`}</h1>
      <TxCoolTableScroller className="flex flex-1" footer={<TxPagenation startPageIdx={pageIdx} itemCount={itemCount} onChangePage={_pageIdx} itemVisibleCount={ITEMSIZE} />}>
        <TxCoolTable className="w-full text-sm text-center" data={vdata} />
      </TxCoolTableScroller>
    </PageLayout>
  );
};

export default Board;
