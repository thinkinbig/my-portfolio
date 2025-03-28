import { Client } from '@notionhq/client';

// 定义类型
interface QueryOptions {
  pageSize?: number;
  startCursor?: string;
  sorts?: any[];
  filter?: any;
}

interface SearchOptions {
  filter?: any;
  sort?: any;
  pageSize?: number;
  startCursor?: string;
}

interface BlockOptions {
  pageSize?: number;
  startCursor?: string;
}

interface PageContent {
  page: any;
  blocks: any;
}

interface DatabaseContent {
  database: any;
  content: any;
}

// 创建 Notion 客户端
const createNotionClient = (): Client => {
  if (!process.env.NOTION_TOKEN_V2) {
    throw new Error('NOTION_TOKEN_V2 is not defined');
  }
  return new Client({
    auth: process.env.NOTION_TOKEN_V2
  });
};

const notionClient = createNotionClient();

// 用户相关
export const getUser = async (): Promise<any> => {
  try {
    return await notionClient.users.me({});
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// 数据库相关
export const getDatabase = async (databaseId: string): Promise<any> => {
  try {
    return await notionClient.databases.retrieve({
      database_id: databaseId
    });
  } catch (error) {
    console.error('获取数据库信息失败:', error);
    throw error;
  }
};

export const queryDatabase = async (databaseId: string, options: QueryOptions = {}): Promise<any> => {
  const {
    pageSize = 100,
    startCursor = undefined,
    sorts = []
  } = options;

  try {
    const queryParams: any = {
      database_id: databaseId,
      page_size: pageSize,
      start_cursor: startCursor,
      sorts: []
    };

    // 只有当 filter 存在时才添加到查询参数中
    if (options.filter) {
      queryParams.filter = options.filter;
    }

    return await notionClient.databases.query(queryParams);
  } catch (error) {
    console.error('查询数据库失败:', error);
    throw error;
  }
};

// 页面相关
export const getPage = async (pageId: string): Promise<any> => {
  try {
    return await notionClient.pages.retrieve({
      page_id: pageId
    });
  } catch (error) {
    console.error('获取页面失败:', error);
    throw error;
  }
};

export const getPageBlocks = async (pageId: string, options: BlockOptions = {}): Promise<any> => {
  const {
    pageSize = 100,
    startCursor = undefined
  } = options;

  try {
    return await notionClient.blocks.children.list({
      block_id: pageId,
      page_size: pageSize,
      start_cursor: startCursor
    });
  } catch (error) {
    console.error('获取页面块失败:', error);
    throw error;
  }
};

// 搜索相关
export const search = async (query: string, options: SearchOptions = {}): Promise<any> => {
  const {
    filter = undefined,
    sort = undefined,
    pageSize = 100,
    startCursor = undefined
  } = options;

  try {
    const searchParams: any = {
      query,
      page_size: pageSize,
      start_cursor: startCursor
    };

    // 只有当 filter 和 sort 存在时才添加到搜索参数中
    if (filter) {
      searchParams.filter = filter;
    }
    if (sort) {
      searchParams.sort = sort;
    }

    return await notionClient.search(searchParams);
  } catch (error) {
    console.error('搜索失败:', error);
    throw error;
  }
};

// 评论相关
export const getComments = async (blockId: string, options: BlockOptions = {}): Promise<any> => {
  const {
    pageSize = 100,
    startCursor = undefined
  } = options;

  try {
    return await notionClient.comments.list({
      block_id: blockId,
      page_size: pageSize,
      start_cursor: startCursor
    });
  } catch (error) {
    console.error('获取评论失败:', error);
    throw error;
  }
};

// 工作区相关
export const getWorkspace = async (): Promise<any> => {
  try {
    return await notionClient.users.me({});
  } catch (error) {
    console.error('获取工作区信息失败:', error);
    throw error;
  }
};

// 批量操作
export const batchGetBlocks = async (blockIds: string[]): Promise<any[]> => {
  try {
    const promises = blockIds.map(id => 
      notionClient.blocks.retrieve({ block_id: id })
    );
    return await Promise.all(promises);
  } catch (error) {
    console.error('批量获取块失败:', error);
    throw error;
  }
};

// 工具方法
export const getPageContent = async (pageId: string): Promise<PageContent> => {
  try {
    const [page, blocks] = await Promise.all([
      getPage(pageId),
      getPageBlocks(pageId)
    ]);
    return { page, blocks };
  } catch (error) {
    console.error('获取页面内容失败:', error);
    throw error;
  }
};

export const getDatabaseContent = async (databaseId: string, options: QueryOptions = {}): Promise<DatabaseContent> => {
  try {
    const [database, content] = await Promise.all([
      getDatabase(databaseId),
      queryDatabase(databaseId, options)
    ]);
    return { database, content };
  } catch (error) {
    console.error('获取数据库内容失败:', error);
    throw error;
  }
};
