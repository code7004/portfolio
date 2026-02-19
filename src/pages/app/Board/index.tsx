import { RouteData } from "@/app/RouteData";
import { useCurrentRoute } from "@/core/routeToolkit";
import { PageLayout } from "@/shared/layout/PageLayout";
import { TxCoolTable, TxCoolTableScroller, TxLoading, TxPagenation } from "@/shared/tx-ui";
import axios from "axios";
import { useEffect, useState } from "react";

const ITEMSIZE = 30;
const Headers = ["id", "title", "category", "price", "discountPercentage", "rating", "stock", "brand", "sku", "weight", "availabilityStatus", "reviews", "returnPolicy", "minimumOrderQuantity"];
const num = () => Math.floor(Math.random() * 1000);

const Board = () => {
  const route = useCurrentRoute(RouteData);
  const [vdata, _vdata] = useState(Array.from({ length: 1000 }).map(e => ({ idx: e, korea: num(), japan: num(), usa: num(), usa2: num(), usa3: num() })));
  const [pageIdx, _pageIdx] = useState(1);
  const [itemCount, _itemCount] = useState(0);
  const [isLoading, _isLoading] = useState(false);

  useEffect(() => {
    (async () => {
      _isLoading(true);
      const temp = await axios.get(`/api/products?limit=${ITEMSIZE}&skip=${ITEMSIZE * (pageIdx - 1)}&select=${Headers.join(",")}`);
      _vdata(temp.data.products);
      _itemCount(temp.data.total);
      _isLoading(false);
    })();
  }, [pageIdx]);

  return (
    <PageLayout className="flex flex-col p-4">
      <h1 className="font-bold">{`${route.data.icon} ${route.data.name}`}</h1>
      <TxCoolTableScroller className="flex flex-1" footer={<TxPagenation startPageIdx={pageIdx} itemCount={itemCount} onChangePage={_pageIdx} itemVisibleCount={ITEMSIZE} />}>
        {isLoading ? <TxLoading /> : <TxCoolTable className="w-full text-sm text-center" data={vdata} options={{ headers: Headers }} />}
      </TxCoolTableScroller>
    </PageLayout>
  );
};

export default Board;
